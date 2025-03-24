import type { ReactNode } from "react";
import { useAuth } from "react-oidc-context";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingSpinner } from "@/components/loading";
import { cognitoLogoutConfig } from "@/config/auth";
import { paths } from "@/config/paths";

/**
 * Cognito認証関連の機能を提供するカスタムフック
 */
export const useCognitoAuth = () => {
	const auth = useAuth();

	return {
		// 認証状態
		isAuthenticated: auth.isAuthenticated,
		isLoading: auth.isLoading,
		error: auth.error,
		user: auth.user,

		// ログイン - 日本語UIで認証画面へリダイレクト
		login: () => {
			auth.signinRedirect({
				extraQueryParams: {
					ui_locales: "ja",
					language: "ja",
				},
			});
		},

		// ログアウト - セッション終了後ログイン画面へリダイレクト
		logout: () => {
			const { clientId } = cognitoLogoutConfig;
			const logoutUri = `${window.location.origin}${paths.login.path}`;

			auth.signoutRedirect({
				extraQueryParams: {
					client_id: clientId,
					logout_uri: logoutUri,
				},
			});
		},
	};
};

/**
 * 認証が必要なルートを保護するコンポーネント
 */
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isLoading, isAuthenticated, error } = useCognitoAuth();
	const location = useLocation();

	// 読み込み中
	if (isLoading) {
		return <LoadingSpinner />;
	}

	// エラー表示
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

	// 未認証の場合、ログインページへリダイレクト
	if (!isAuthenticated) {
		// 現在のパスをリダイレクト先として保存
		return (
			<Navigate to={paths.login.path} state={{ from: location }} replace />
		);
	}

	// 認証済み：子コンポーネントを表示
	return <>{children}</>;
};
