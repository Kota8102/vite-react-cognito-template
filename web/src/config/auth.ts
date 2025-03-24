/**
 * Cognito認証の設定
 * 環境変数から認証に必要な設定を読み込み、必要な設定オブジェクトを提供します。
 */

// 環境変数からCognito設定を取得
const REGION = import.meta.env.VITE_COGNITO_REGION || "us-east-1";
const USER_POOL_ID = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const REDIRECT_URI =
	import.meta.env.VITE_COGNITO_REDIRECT_URI || "http://localhost:5173";
const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;

// 環境変数が設定されていない場合のエラーチェック
if (!USER_POOL_ID || !CLIENT_ID || !COGNITO_DOMAIN) {
	throw new Error(
		"Cognito環境変数が設定されていません。.envファイルを確認してください。\n" +
			"必要な環境変数: VITE_COGNITO_USER_POOL_ID, VITE_COGNITO_CLIENT_ID, VITE_COGNITO_DOMAIN",
	);
}

// 認証設定の型定義
export interface CognitoAuthConfig {
	authority: string;
	client_id: string;
	redirect_uri: string;
	response_type: string;
	scope: string;
	ui_locales: string;
	extraQueryParams: {
		ui_locales: string;
	};
}

// ログアウト設定の型定義
export interface CognitoLogoutConfig {
	clientId: string;
	logoutUri: string;
	cognitoDomain: string;
}

// Cognitoの認証設定
export const cognitoAuthConfig: CognitoAuthConfig = {
	authority: `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`,
	client_id: CLIENT_ID,
	redirect_uri: REDIRECT_URI,
	response_type: "code",
	scope: "phone openid email",
	ui_locales: "ja-JP",
	extraQueryParams: {
		ui_locales: "ja",
	},
};

// Cognitoのログアウト用設定
export const cognitoLogoutConfig: CognitoLogoutConfig = {
	clientId: CLIENT_ID,
	logoutUri: REDIRECT_URI,
	cognitoDomain: COGNITO_DOMAIN,
};
