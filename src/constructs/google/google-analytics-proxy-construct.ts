import { EndpointType } from "aws-cdk-lib/aws-apigateway";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import fs from "fs";
import { ProxyConstruct } from "../proxy-construct";

export class GoogleAnalyticsProxyConstruct extends Construct {
  // https://developers.google.com/tag-platform/tag-manager/web
  constructor(construct: Construct, id: string, props: { gtmID: string }) {
    super(construct, id);
    const apiName = "GoogleAnalyticsProxy";
    const proxy = new ProxyConstruct(this, apiName, {
      apiName: apiName,
      description: "An API Gateway proxy to the google analytics website.",
      endpointType: EndpointType.REGIONAL,
    });

    proxy.addProxy("ga", "https://www.google-analytics.com", "GET");
    proxy.addProxy("ga", "https://www.google-analytics.com", "POST");

    const gtagScript = fs
      .readFileSync(
        "node_modules/@pinegraph/analytics-proxy-cdk/lib/constructs/google/gtag.js",
        "utf-8"
      )
      .replaceAll("G-ELITECDKEX", props.gtmID)
      .replaceAll(
        `"https://"+a+".google-analytics.com/g/collect"`,
        `"${proxy.api.url}/prod/ga/g/collect"`
      )
      .replaceAll(
        `"https://"+(a?a+".":"")+"analytics.google.com/g/collect"`,
        `"${proxy.api.url}/prod/ga/g/collect"`
      );

    const googleGtagScriptBucket = new Bucket(this, "GoogleGTagScript", {
      publicReadAccess: true,
    });

    new BucketDeployment(this, "DeployGoogleGTagScript", {
      sources: [Source.data("gtag.js", gtagScript)],
      destinationBucket: googleGtagScriptBucket,
    });
  }
}
