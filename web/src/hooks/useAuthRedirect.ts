import { useAuth } from "react-oidc-context";
import { signOutRedirect } from "../config/auth";

/**
 * 認証関連のリダイレクト処理をまとめたカスタムフック
 */
export const useAuthRedirect = () => {
  const auth = useAuth();

  // Cognitoへのログインリダイレクト
  const loginRedirect = () => {
    auth.signinRedirect({
      extraQueryParams: {
        ui_locales: "ja",
        language: "ja",
      },
    });
  };

  // クライアント側でのログアウト
  const logoutClient = () => {
    auth.removeUser();
  };

  // Cognito側でのログアウト
  const logoutCognito = () => {
    signOutRedirect();
  };

  return {
    loginRedirect,
    logoutClient,
    logoutCognito,
  };
};