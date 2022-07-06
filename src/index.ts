// Example usage

import { GoogleAnalyticsProxyConstruct } from "./constructs/google/google-analytics-proxy-construct";

import { App, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

const app = new App();

export class ExampleStack extends Stack {
  constructor(app: Construct, name: string, props: StackProps) {
    super(app, name, props);
    new GoogleAnalyticsProxyConstruct(this, "HttpProxy", {
      gtmID: "TEST-1111111",
    });
  }
}
new ExampleStack(app, "ExampleStack", {
  env: {
    account: "1111-1111-1111-1111", // AWS Account ID
    region: "us-east-1", // AWS Region
  },
});
app.synth();
export { GoogleAnalyticsProxyConstruct as GoogleAnalyticsProxyConstruct };
