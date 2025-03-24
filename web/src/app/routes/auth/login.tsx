import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/loading";
import { loginRedirect } from "../../../lib/auth";
import { paths } from "../../../config/paths";

/**
 * ログインページコンポーネント
 * 未認証の場合はCognitoの認証画面にリダイレクトし、
 * 認証済みの場合はホームページにリダイレクトします
 */
export const LoginPage = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const { isLoading, isAuthenticated } = auth;

	useEffect(() => {
		if (!isLoading) {
			if (isAuthenticated) {
				// 認証済みの場合はホームページへリダイレクト
				navigate(paths.home.path);
			} else {
				// 未認証の場合はCognitoの認証画面へリダイレクト
				loginRedirect(auth);
			}
		}
	}, [isLoading, isAuthenticated, auth, navigate]);

	return <LoadingSpinner />;
};
