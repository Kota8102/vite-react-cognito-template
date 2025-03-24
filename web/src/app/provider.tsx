import type { ReactNode } from "react";
import { AuthProvider as OidcAuthProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";
import { cognitoAuthConfig } from "../config/auth";

/**
 * アプリケーション全体のプロバイダーを管理するコンポーネント
 * 認証、ルーティング、状態管理などのプロバイダーをここに集約します
 */
export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<BrowserRouter>
			<OidcAuthProvider {...cognitoAuthConfig}>{children}</OidcAuthProvider>
		</BrowserRouter>
	);
}
