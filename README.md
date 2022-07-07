<div align="center">
  <br />
  <p>
    <a href="https://pinegraph.com/"><img src="https://pinegraph.com/img/favicon.ico" width="100px"/></a>
  </p>
  <br />
  <p>
    <a href="https://discord.gg/MVEUBBX2vB"><img src="https://img.shields.io/discord/955641113673347193?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/@pinegraph/analytics-proxy-cdk-constructs"><img src="https://img.shields.io/npm/v/@pinegraph/analytics-proxy-cdk-constructs.svg?maxAge=3600" alt="npm version" /></a>
  </p>
</div>

# Analytics Proxy Constructs

## What is this?

This package is an [AWS CDK construct](https://aws.amazon.com/cdk/) for creating a proxy over popular analytics frameworks. It creates a simple API Gateway endpoint that proxies to an analytics service and an S3 bucket to host a modified script.

AWS CDK enables people to have infrastructure as code (IAC). That is, with just a few commands, you'll have a fully running and functional production ready service in the cloud.

## Problem

Ad blocking frameworks prevent analytics from being collected for popular frameworks like Google Analytics and Meta Pixel Events. While we should always value the user's privacy, we often have uses cases where we need to collect metrics on the site to improve it and find bugs. More often than not, re-inventing a solution results in less security, less features, less privacy, and more bugs.

## Benefits

By using this proxy, you'll be able to get all metrics more accurately and cheaply than [other solutions](https://iainbean.com/posts/2020/the-shady-world-of-google-analytics-proxying/). The first 1 million API Gateway requests are free and is around $3.50 for each subsequent million requests.

## Setup

1. This package assummes that you are familiar with AWS CDK and already have a CDK app created. If not, follow [this tutorial](https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html).
2. Once you have a CDK app ready, create a new stack or modify an existing one to include the GoogleAnalyticsProxyConstruct. See the `Example CDK App Code` below.
3. Deploy your change via `cdk deploy`.
4. Go to your newly created or modified Cloudformation stack and look for the output value of `*AnalyticsProxyGoogleAnalyticsSnippet*`. For instance, if you are using `GoogleAnalyticsProxy`, you should see an output of with a key similar to `GoogleAnalyticsProxyGoogleAnalyticsSnippet5ACCDD73` with a value similar to `<script async src="https://websiteapis-googleanalyticsproxygooglegtagscriptc-6m06wqo0fty0.s3.amazonaws.com/gtag.js"></script>`.
5. Add the output to your website in the head tag.

## Example CDK App Code

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

## Questions?

Reach out to us on [discord](https://discord.gg/MVEUBBX2vB).

## Releasing

1. `npm run build`
2. `npm publish --access public`
