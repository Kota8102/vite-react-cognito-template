import * as cdk from "aws-cdk-lib";
import { Stack } from "aws-cdk-lib";
import { Construct } from "constructs";
import type * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3 from "aws-cdk-lib/aws-s3";
import { CloudFrontToS3 } from "@aws-solutions-constructs/aws-cloudfront-s3";
import { NodejsBuild } from "deploy-time-build";
import type * as cognito from "aws-cdk-lib/aws-cognito";

export interface HostingProps {
  /**
   * スタック名
   * @description バケット名などのリソース名の生成に使用します
   */
  stackName: string;
  /**
   * Cognito関連のリソース
   */
  cognito: {
    /** ユーザープール */
    userPool: cognito.UserPool;
    /** ユーザープールクライアント */
    userPoolClient: cognito.UserPoolClient;
    /** Cognitoドメイン */
    domain: string;
  };
}

/**
 * CloudFront + S3によるホスティング環境を提供するConstruct
 */
export class Hosting extends Construct {
  /**
   * CloudFront Distribution
   */
  public readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: HostingProps) {
    super(scope, id);

    // CloudFront + S3の構成を作成
    const { cloudFrontWebDistribution, s3BucketInterface } = new CloudFrontToS3(
      this,
      "WebHosting",
      {
        bucketProps: {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          enforceSSL: true,
          autoDeleteObjects: true,
          removalPolicy: cdk.RemovalPolicy.DESTROY,
        },
        cloudFrontDistributionProps: {
          errorResponses: [
            {
              httpStatus: 403,
              responsePagePath: "/index.html",
              responseHttpStatus: 200,
              ttl: cdk.Duration.seconds(0),
            },
            {
              httpStatus: 404,
              responsePagePath: "/index.html",
              responseHttpStatus: 200,
              ttl: cdk.Duration.seconds(0),
            },
          ],
        },
      }
    );

    // Viteアプリケーションのビルド設定
    new NodejsBuild(this, "WebBuild", {
      assets: [{ path: "../web" }],
      destinationBucket: s3BucketInterface,
      distribution: cloudFrontWebDistribution,
      outputSourceDirectory: "dist",
      buildCommands: ["npm install", "npm run build"],
      buildEnvironment: {
        VITE_COGNITO_REGION: Stack.of(this).region,
        VITE_COGNITO_USER_POOL_ID: props.cognito.userPool.userPoolId,
        VITE_COGNITO_CLIENT_ID: props.cognito.userPoolClient.userPoolClientId,
        VITE_COGNITO_DOMAIN: props.cognito.domain,
        VITE_COGNITO_REDIRECT_URI: `https://${cloudFrontWebDistribution.distributionDomainName}`,
      },
    });

    this.distribution = cloudFrontWebDistribution;

    // CloudFrontのドメイン名を出力
    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: this.distribution.distributionDomainName,
      description: "CloudFront Distribution Domain Name",
    });
  }
}
