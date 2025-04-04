import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/lib/auth";
import { paths } from "../config/paths";
import { LoadingSpinner } from "../components/loading";

// 遅延ロードによるコード分割
const HomePage = lazy(() =>
	import("./routes/app/home").then((module) => ({ default: module.HomePage })),
);
const LoginPage = lazy(() =>
	import("./routes/auth/login").then((module) => ({
		default: module.LoginPage,
	})),
);

/**
 * アプリケーションのルーターコンポーネント
 * React Routerを使用して、パスに基づいて適切なコンポーネントを表示します
 */
export const AppRouter = () => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<Routes>
				{/* ログインページ */}
				<Route path={paths.login.path} element={<LoginPage />} />

				{/* ホームページ - 認証が必要 */}
				<Route
					path={paths.home.path}
					element={
						<ProtectedRoute>
							{/* 認証済みユーザー向けのホームページ */}
							{/* 認証されていない場合はログインページにリダイレクト */}
							<HomePage />
						</ProtectedRoute>
					}
				/>

				{/* 存在しないパスへのアクセスはホームにリダイレクト */}
				<Route path="*" element={<Navigate to={paths.home.path} replace />} />
			</Routes>
		</Suspense>
	);
};
