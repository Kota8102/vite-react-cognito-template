import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/loading";
import { cognitoLogoutConfig } from "../config/auth";
import { paths } from "../config/paths";

/**
 * Cognitoへのログインリダイレクト処理
 */
export const loginRedirect = (auth: ReturnType<typeof useAuth>) => {
	auth.signinRedirect({
		extraQueryParams: {
			ui_locales: "ja",
			language: "ja",
		},
	});
};

/**
 * ログアウト処理
 * Cognitoのログアウトエンドポイントにリダイレクトしてセッションを終了します
 * ログアウト後は/loginページに遷移します
 */
export const signOut = (auth: ReturnType<typeof useAuth>) => {
	const { clientId } = cognitoLogoutConfig;
	const logoutUri = `${window.location.origin}${paths.login.path}`;

	auth.signoutRedirect({
		extraQueryParams: {
			client_id: clientId,
			logout_uri: logoutUri,
		},
	});
};

/**
 * 認証が必要なコンポーネントをラップするためのコンポーネント
 * 認証されていない場合は、/loginにリダイレクトします
 */
export const RequireAuth = ({ children }: { children: ReactNode }) => {
	const auth = useAuth();
	const navigate = useNavigate();
	const { isLoading, isAuthenticated, error } = auth;

	useEffect(() => {
		if (!isLoading && !isAuthenticated && !error) {
			navigate(paths.login.path);
		}
	}, [isLoading, isAuthenticated, error, navigate]);

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center">
				<div className="text-2xl text-red-500 mb-4">
					認証エラーが発生しました
				</div>
				<div className="text-lg">{error.message}</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return <LoadingSpinner />;
	}

	return <>{children}</>;
};
