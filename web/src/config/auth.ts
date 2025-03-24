// 環境変数からCognito設定を取得
const REGION = import.meta.env.VITE_COGNITO_REGION || "us-east-1";
const USER_POOL_ID = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const REDIRECT_URI =
	import.meta.env.VITE_COGNITO_REDIRECT_URI || "http://localhost:5173";
const COGNITO_DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN;

// 環境変数が設定されていない場合のエラーチェック
if (!USER_POOL_ID || !CLIENT_ID || !COGNITO_DOMAIN) {
	console.error(
		"Cognito環境変数が設定されていません。.envファイルを確認してください。",
	);
}

// Cognitoの認証設定
export const cognitoAuthConfig = {
	authority: `https://cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`,
	client_id: CLIENT_ID,
	redirect_uri: REDIRECT_URI,
	response_type: "code",
	scope: "phone openid email",
	ui_locales: "ja-JP", // 認証画面を日本語に設定（ja-JPフォーマットで試す）
	extraQueryParams: {
		ui_locales: "ja", // クエリパラメータとしても追加
	},
};

// Cognitoのログアウト用設定
export const cognitoLogoutConfig = {
	clientId: CLIENT_ID,
	logoutUri: REDIRECT_URI,
	cognitoDomain: COGNITO_DOMAIN,
};

// Cognitoのログアウト処理
export const signOutRedirect = () => {
	const { clientId, logoutUri, cognitoDomain } = cognitoLogoutConfig;
	window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};
