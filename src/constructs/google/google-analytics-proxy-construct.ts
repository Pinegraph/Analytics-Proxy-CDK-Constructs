import { EndpointType } from "aws-cdk-lib/aws-apigateway";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import fs from "fs";
import { ProxyConstruct } from "../proxy-construct";

export class GoogleAnalyticsProxyConstruct extends Construct {
  // https://developers.google.com/tag-platform/tag-manager/web
  scriptBucket: Bucket;
  proxyAPI: ProxyConstruct;
  constructor(construct: Construct, id: string, props: { gtmID: string }) {
    super(construct, id);
    const apiName = "GoogleAnalyticsProxy";
    const proxy = new ProxyConstruct(this, apiName, {
      apiName: apiName,
      description: "An API Gateway proxy to the google analytics website.",
      endpointType: EndpointType.REGIONAL,
    });
    this.proxyAPI = proxy;

    proxy.addProxy("ga", "https://www.google-analytics.com", "POST");

    const gtagScript = fs
      .readFileSync(
        "node_modules/@pinegraph/analytics-proxy-cdk/lib/constructs/google/gtag.js",
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
