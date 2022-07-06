# Analytics Proxy Constructs

We believe that open source code should be as reproducible as possible. As a result, a strict we've taken an Infrastructure as Code (IaC) approch.

This construct enables you to create a simple API Gateway proxy over popular analytics frameworks like Google's Tag Manager/ Google Analytics and Meta's Pixel Events. This is to track events even if a user has an ad blocker.

# Setup

1. This package assummes that you are familiar with AWS CDK and already have a CDK app created. If not, follow [this tutorial](https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html).
2. Once you have a CDK app ready, create a new stack or modify an existing one to include the GoogleAnalyticsProxyConstruct. See the `Example CDK App Code` below.
3. Deploy your change via `cdk deploy`.
4. Go to your newly created or modified Cloudformation stack and look for the output value of `*AnalyticsProxyGoogleAnalyticsSnippet*`. For instance, if you are using `GoogleAnalyticsProxy`, you should see an output of with a key similar to `GoogleAnalyticsProxyGoogleAnalyticsSnippet5ACCDD73` with a value similar to `<script async src="https://websiteapis-googleanalyticsproxygooglegtagscriptc-6m06wqo0fty0.s3.amazonaws.com/gtag.js"></script>`.
5. Add the output to your website in the head tag.

# Example CDK App Code

```
import { App, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

const app = new App();

export class ExampleStack extends Stack {
  constructor(app: Construct, name: string, props: StackProps) {
    super(app, name, props);
    new GoogleAnalyticsProxyConstruct(this, "GoogleAnalyticsProxy", {
      gtmID: "G-EXAMPLETAG",
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
```

# FAQ

Useful reference of other options, the ethics, and overview of how this works: https://iainbean.com/posts/2020/the-shady-world-of-google-analytics-proxying/

# Releasing

1. `npm run build`
2. `npm publish --access public`
