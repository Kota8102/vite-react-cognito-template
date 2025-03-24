// Cognitoの認証設定
// 注意: 実際のプロジェクトでは、これらの値は環境変数から取得することをお勧めします
export const cognitoAuthConfig = {
	authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_y8uRyY5zG",
	client_id: "6fetk1vfv8q3ls4fvanv72s1t5",
	redirect_uri: "http://localhost:5173", // Viteのデフォルトポート
	response_type: "code",
	scope: "phone openid email",
	ui_locales: "ja-JP", // 認証画面を日本語に設定（ja-JPフォーマットで試す）
	extraQueryParams: {
		ui_locales: "ja", // クエリパラメータとしても追加
	},
};

// Cognitoのログアウト用設定
export const cognitoLogoutConfig = {
	clientId: "6fetk1vfv8q3ls4fvanv72s1t5",
	logoutUri: "http://localhost:5173", // Viteのデフォルトポート
	cognitoDomain: "https://us-east-1y8uryy5zg.auth.us-east-1.amazoncognito.com",
};

// Cognitoのログアウト処理
export const signOutRedirect = () => {
	const { clientId, logoutUri, cognitoDomain } = cognitoLogoutConfig;
	window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
};
