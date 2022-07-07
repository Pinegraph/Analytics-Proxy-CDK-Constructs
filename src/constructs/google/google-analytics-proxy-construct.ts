import { EndpointType } from "aws-cdk-lib/aws-apigateway";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import fs from "fs";
import { ProxyConstruct } from "../proxy-construct";

/**
 * Creates a proxy endpoint for Google Analytics that isn't
 * detected by ad blockers.
 */
export class GoogleAnalyticsProxyConstruct extends Construct {
  scriptBucket: Bucket;
  proxyAPI: ProxyConstruct;
  constructor(
    construct: Construct,
    id: string,
    props: {
      /* https://developers.google.com/tag-platform/tag-manager/web */
      gtmID: string;
    }
  ) {
    super(construct, id);
    const apiName = "GoogleAnalyticsProxy";
    const proxy = new ProxyConstruct(this, apiName, {
      apiName: apiName,
      description: "An API Gateway proxy to the google analytics website.",
      endpointType: EndpointType.REGIONAL,
    });
    this.proxyAPI = proxy;

    proxy.addProxy("ga", "https://www.google-analytics.com", {
      "integration.request.path.proxy": "method.request.path.proxy",
      "integration.request.querystring._uip":
        "method.request.header.x-forwarded-for",
      "integration.request.querystring._ua": "method.request.header.user-agent",
      "integration.request.querystring.uip":
        "method.request.header.x-forwarded-for",
      "integration.request.querystring.ua": "method.request.header.user-agent",
    });

    const gtagScript = fs
      .readFileSync(
        "node_modules/@pinegraph/analytics-proxy-cdk-constructs/lib/constructs/google/gtag.js",
        "utf-8"
      )
      .replaceAll("G-ELITECDKEX", props.gtmID)
      .replaceAll(
        `"https://"+a+".google-analytics.com/g/collect"`,
        `"${proxy.api.url}ga/g/collect"`
      )
      .replaceAll(
        `"https://"+(a?a+".":"")+"analytics.google.com/g/collect"`,
        `"${proxy.api.url}ga/g/collect"`
      );

    const googleGtagScriptBucket = new Bucket(this, "GoogleGTagScript", {
      publicReadAccess: true,
    });

    this.scriptBucket = googleGtagScriptBucket;

    new BucketDeployment(this, "DeployGoogleGTagScript", {
      sources: [Source.data("g-analy-tics.js", gtagScript)],
      destinationBucket: googleGtagScriptBucket,
    });
  }
}
