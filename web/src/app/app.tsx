import { AppRouter } from "./router";
import { AppProviders } from "./provider";

/**
 * アプリケーションのルートコンポーネント
 */
export const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}