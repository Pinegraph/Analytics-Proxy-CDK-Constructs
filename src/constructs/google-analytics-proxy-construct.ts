import { EndpointType } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { ProxyConstruct } from "./proxy-construct";

export class GoogleAnalyticsProxyConstruct extends Construct {
  constructor(construct: Construct, id: string) {
    super(construct, id);

    const proxy = new ProxyConstruct(this, "GooglyAnalyticsProxy", {
      apiName: "HttpProxy",
      endpointType: EndpointType.REGIONAL,
    });

    proxy.addProxy("ga", "https://www.google-analytics.com");
  }
}
