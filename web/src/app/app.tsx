import { AppRouter } from "./router";
import { AppProviders } from "./provider";

/**
 * アプリケーションのルートコンポーネント
 */
export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}