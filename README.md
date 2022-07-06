# Analytics Proxy Constructs

We believe that open source code should be as reproducible as possible. As a result, a strict we've taken an Infrastructure as Code (IaC) approch.

This construct enables you to create a simple API Gateway proxy over popular analytics frameworks like Google's Tag Manager/ Google Analytics and Meta's Pixel Events. This is to track events even if a user has an ad blocker.

# Setup

1. This package assummes that you are familiar with AWS CDK and already have a CDK app created. If not, follow [this tutorial](https://docs.aws.amazon.com/cdk/v2/guide/hello_world.html).
2. Once you have a CDK app ready, create a new stack or modify an existing one to include the GoogleAnalyticsProxyConstruct. See the Example CDK App Code Below
3. Run `cdk deploy`.
4. Go to your newly created or modified Cloudformation stack and look for the output value of `*AnalyticsProxy`. For instance, if you are using `GoogleAnalyticsProxy`, look for that endpoint.
5. Replace the endpoint in the scripts of interest. For instance, in `https://www.googletagmanager.com/gtag/js?id=G-EXAMPLE`, replace `google-analytics.com` with the endpoint created and include the results in the scripts tag of your website. See Example Google Analytics Modification below.

# Example CDK App Code

```
import { App, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

const app = new App();

export class ExampleStack extends Stack {
  constructor(app: Construct, name: string, props: StackProps) {
    super(app, name, props);
    new GoogleAnalyticsProxyConstruct(this, "HttpProxy");
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

# Example Google Analytics Modifcation

```

// Copyright 2012 Google Inc. All rights reserved.
(function(){

...
Du[T.g.ne]="edid";var Eu={};Eu[T.g.Uc]="cc";Eu[T.g.Vc]="ci";Eu[T.g.Wc]="cm";Eu[T.g.Xc]="cn";Eu[T.g.Yc]="cs";Eu[T.g.Zc]="ck";var vu=function(){var a="www";Au&&zu&&(a=zu);return"https://examplendpoint.execute-api.us-east-1.amazonaws.com/prod/ga/g/collect"},uu=function(){var a;Au&&zu&&(a=zu);return"https://examplendpoint.execute-api.us-east-1.amazonaws.com/prod/ga/g/collect"},Fu=function(a,b,c){function d(A,z){if(void 0!==z&&!nd.hasOwnProperty(A)){null===z&&(z="");var E=z;!0===z&&(E="1");!1===z&&(E="0");var G;if(Bu[A])G=Bu[A],e[G]=nc(E,420);else if(Cu[A])G=Cu[A],g[G]=nc(E,420);else if(Du[A])G=Du[A],f[G]=nc(E,420);else if("_"===A.charAt(0))e[A]=nc(E,420);else{var D;(D=u(A,z))||(Eu[A]?D=!0:A!==T.g.bc?D=!1:("object"!==typeof z&&t(A,z),D=!0));D||t(A,z)}}}var e={},f={},g={};e.v="2";e.tid=a.D;e.gtm=og();e._p=Lt();a.De&&(e._z=a.De);c&&(e.em=c);if(xu?a.metadata.create_google_join:a.od)e._gaz=1;su(e,a);qu(e,a);a.fg&&!xu&&(e.gtm_up="1");a.sa()&&a.eg&&!yu&&(e._glv="1");
var k=a.s[T.g.qe];k&&(e.gdid=k);f.en=nc(a.eventName,40);var l=xu?a.metadata.is_first_visit_conversion:a.cg;xu?a.metadata.is_first_visit&&(f._fv=l?2:1):a.sd&&(f._fv=l?2:1);xu?a.metadata.is_new_to_site&&(f._nsi=1):a.bg&&(f._nsi=1);var n=xu?a.metadata.is_session_start_conversion:a.gg;xu?a.metadata.is_session_start&&(f._ss=n?2:1):a.ia&&(f._ss=n?2:1);xu?a.metadata.is_conversion&&(f._c=1):a.rd&&(f._c=1);a.metadata.is_external_event&&(f._ee=1);0<a.pd&&!xu&&(f._et=a.pd);if(a.metadata.is_ecommerce){var p=
a.s[T.g.Z]||a.C(T.g.Z);if(ra(p))for(var q=0;q<p.length&&200>q;q++)f["pr"+(q+1)]=sc(p[q])}var r=a.s[T.g.ne];r&&(f.edid=r);for(var t=function(A,z){A=nc(A,40);var C="ep."+A,E="epn."+A;A=qa(z)?E:C;var G=qa(z)?C:E;f.hasOwnProperty(G)&&delete f[G];f[A]=nc(z,100)},u=function(A,z){var C=A.split(".");if(A===T.g.qa&&"object"!==typeof z)return t(A,z),!0;if(C[0]===T.g.qa){if((1<C.length||"object"===typeof z)&&a.sa()){var E=tu(A,z);wa(E,function(G,D){return void t(G,D)})}return!0}return!1},v=0;v<od.length;++v){var x=
od[v];d(x,a.C(x))}wa(a.Sf,d);wa(a.U,d);wa(a.s,d);a.metadata.user_data&&u("user_data",a.metadata.user_data);var y=a.s[T.g.Ia]||a.C(T.g.Ia)||{};!1!==a.C(T.g.W)&&Vn()||(y._npa="1");wa(y,function(A,z){if(void 0!==z)if(null===z&&(z=""),A===T.g.Ha&&!g.uid)g.uid=nc(z,36);else if(b[A]!==z){var C=(qa(z)?"upn.":"up.")+nc(A,24);f[C]=nc(z,36);b[A]=z}});Ui[17]&&a.sa()&&d("_uc",Ye.pg);var w=!1;
...
```

# FAQ

Useful reference of other options, the ethics, and overview of how this works: https://iainbean.com/posts/2020/the-shady-world-of-google-analytics-proxying/

# Releasing

1. `npm run build`
2. `npm publish --access public`
