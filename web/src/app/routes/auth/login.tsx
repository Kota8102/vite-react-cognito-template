import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LoadingSpinner } from "@/components/loading";
import { useCognitoAuth } from "@/lib/auth";
import { paths } from "@/config/paths";

/**
 * ログインページコンポーネント
 * - 認証済み：ホームページへリダイレクト
 * - 未認証：Cognito認証画面へリダイレクト
 */
export const LoginPage = () => {
	const { isLoading, isAuthenticated, login } = useCognitoAuth();

	// 未認証の場合、Cognitoの認証画面へリダイレクト
	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			login();
		}
	}, [isLoading, isAuthenticated, login]);

	// 読み込み中の表示
	if (isLoading) {
		return <LoadingSpinner />;
	}

	// 認証済みの場合、ホームページへリダイレクト
	if (isAuthenticated) {
		return <Navigate to={paths.home.path} replace />;
	}

	// リダイレクト待機中
	return <LoadingSpinner />;
};
