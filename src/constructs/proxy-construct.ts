import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

export interface ProxyConstructProps {
  readonly apiName: string;
  readonly endpointType: apiGateway.EndpointType;
  readonly description: string;
}

export class ProxyConstruct extends Construct {
  public readonly api: apiGateway.RestApi;

  constructor(scope: Construct, id: string, props: ProxyConstructProps) {
    super(scope, id);

    this.api = new apiGateway.RestApi(this, props.apiName + "API", {
      restApiName: props.apiName,
      description: props.description,
      endpointConfiguration: {
        types: [props.endpointType],
      },
    });
  }

  public addProxy(id: string, baseUrl: string, method: string = "GET") {
    const namespace = this.api.root.addResource(id);
    const proxyResource = new apiGateway.ProxyResource(
      this,
      `${this.api.restApiName}ProxyResource${method}${id}`,
      {
        parent: namespace,
        anyMethod: false,
      }
    );

    proxyResource.addMethod(
      method,
      new apiGateway.HttpIntegration(`${baseUrl}/{proxy}`, {
        proxy: true,
        httpMethod: method,
        options: {
          requestParameters: {
            "integration.request.path.proxy": "method.request.path.proxy",
          },
        },
      }),
      {
        requestParameters: {
          "method.request.path.proxy": true,
        },
      }
    );
  }
}
