import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";
import { Auth } from "./construct/auth";
import { Hosting } from "./construct/hosting";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Cognitoの設定
    const auth = new Auth(this, "Auth", {
      stackName: id,
    });

    // CloudFront + S3ホスティングの設定
    new Hosting(this, "Hosting", {
      stackName: id,
      cognito: {
        userPool: auth.userPool,
        userPoolClient: auth.client,
        domain: `https://${auth.userPool.userPoolProviderName}.auth.${this.region}.amazoncognito.com`,
      },
    });
  }
}
