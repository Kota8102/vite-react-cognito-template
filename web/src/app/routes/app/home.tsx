import React from "react";
import { useAuth } from "react-oidc-context";
import { useAuthRedirect } from "../../../hooks/useAuthRedirect";

/**
 * ホーム画面コンポーネント
 * 認証済みユーザー向けの画面を表示します
 */
export const HomePage = () => {
  const auth = useAuth();
  const { logoutClient, logoutCognito } = useAuthRedirect();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">認証済みユーザー</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-2xl">
        <div className="mb-4">
          <div className="font-semibold text-gray-700">メールアドレス:</div>
          <div className="bg-gray-100 p-2 rounded">
            {auth.user?.profile.email}
          </div>
        </div>

        <div className="mb-4">
          <div className="font-semibold text-gray-700">ID Token:</div>
          <div className="bg-gray-100 p-2 rounded overflow-x-auto">
            <code className="text-xs">{auth.user?.id_token}</code>
          </div>
        </div>

        <div className="mb-4">
          <div className="font-semibold text-gray-700">Access Token:</div>
          <div className="bg-gray-100 p-2 rounded overflow-x-auto">
            <code className="text-xs">{auth.user?.access_token}</code>
          </div>
        </div>

        {auth.user?.refresh_token && (
          <div className="mb-4">
            <div className="font-semibold text-gray-700">Refresh Token:</div>
            <div className="bg-gray-100 p-2 rounded overflow-x-auto">
              <code className="text-xs">{auth.user.refresh_token}</code>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={logoutClient}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          ログアウト (クライアント側)
        </button>
        <button
          type="button"
          onClick={logoutCognito}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          ログアウト (Cognito側)
        </button>
      </div>
    </div>
  );
}