import { useEffect } from "react";
import type { ReactNode } from "react";
import { useAuth } from "react-oidc-context";
import { LoadingSpinner } from "../components/loading";

/**
 * 認証が必要なコンポーネントをラップするためのコンポーネント
 * 認証されていない場合は、ログイン画面にリダイレクトします
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const { isLoading, isAuthenticated, error } = auth;

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !error) {
      auth.signinRedirect({
        extraQueryParams: {
          ui_locales: "ja",
          language: "ja",
        },
      });
    }
  }, [isLoading, isAuthenticated, error, auth]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-red-500 mb-4">認証エラーが発生しました</div>
        <div className="text-lg">{error.message}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}