import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as cdk from "aws-cdk-lib";

export interface AuthProps {
  readonly stackName: string;
}

export class Auth extends Construct {
  public readonly userPool: cognito.UserPool;
  public readonly client: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props: AuthProps) {
    super(scope, id);

    // Cognitoユーザープールの作成
    this.userPool = new cognito.UserPool(this, "UserPool", {
      userPoolName: `${props.stackName}-user-pool`,
      selfSignUpEnabled: true, // ユーザーの自己サインアップを許可
      signInAliases: {
        email: true, // メールアドレスでのサインインを許可
      },
      // 標準属性の設定
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
      },
      // パスワードポリシー
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true,
      },
      // アカウント検証
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    // アプリケーションクライアントの作成
    this.client = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool: this.userPool,
      authFlows: {
        adminUserPassword: true, // 管理者によるパスワード認証を有効化
        userPassword: true, // ユーザーパスワード認証を有効化
      },
    });

    // CloudFormationの出力を設定
    new cdk.CfnOutput(this, "UserPoolId", {
      value: this.userPool.userPoolId,
    });

    new cdk.CfnOutput(this, "UserPoolClientId", {
      value: this.client.userPoolClientId,
    });
  }
}