import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import { useAuth } from "react-oidc-context";

/**
 * ホーム画面コンポーネント
 * 認証済みユーザー向けの画面を表示します
 */
export const HomePage = () => {
	const auth = useAuth();

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

			<div className="flex justify-center">
				<Button variant="destructive" onClick={signOut}>
					ログアウト
				</Button>
			</div>
		</div>
	);
};
