import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "../lib/auth";
import { paths } from "../config/paths";
import { LoadingSpinner } from "../components/loading";

// 遅延ロードによるコード分割
const HomePage = lazy(() => import("./routes/app/home").then(module => ({ default: module.HomePage })));

/**
 * アプリケーションのルーターコンポーネント
 * React Routerを使用して、パスに基づいて適切なコンポーネントを表示します
 */
export function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* ホームページ - 認証が必要 */}
        <Route
          path={paths.home.path}
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />

        {/* 存在しないパスへのアクセスはホームにリダイレクト */}
        <Route path="*" element={<Navigate to={paths.home.path} replace />} />
      </Routes>
    </Suspense>
  );
}