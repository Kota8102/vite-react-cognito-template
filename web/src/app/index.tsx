import { AppRouter } from "@/app/router";
import { AppProviders } from "@/app/provider";

/**
 * アプリケーションのルートコンポーネント
 */
export const App = () => {
	return (
		<AppProviders>
			<AppRouter />
		</AppProviders>
	);
};
