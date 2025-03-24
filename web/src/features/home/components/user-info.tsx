import { useAuth } from "react-oidc-context";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const UserInfo = () => {
	const auth = useAuth();

	return (
		<div className="w-full max-w-2xl space-y-4">
			<Card>
				<CardHeader>
					<CardTitle>ユーザー情報</CardTitle>
					<CardDescription>認証されたユーザーの基本情報</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<div>
							<div className="font-semibold text-gray-700 mb-1">
								メールアドレス
							</div>
							<div className="bg-gray-100 p-2 rounded">
								{auth.user?.profile.email}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>認証トークン</CardTitle>
					<CardDescription>
						セッション認証に使用されるトークン情報
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<div className="font-semibold text-gray-700 mb-1">ID Token</div>
						<div className="bg-gray-100 p-2 rounded overflow-x-auto">
							<code className="text-xs">{auth.user?.id_token}</code>
						</div>
					</div>

					<div>
						<div className="font-semibold text-gray-700 mb-1">Access Token</div>
						<div className="bg-gray-100 p-2 rounded overflow-x-auto">
							<code className="text-xs">{auth.user?.access_token}</code>
						</div>
					</div>

					{auth.user?.refresh_token && (
						<div>
							<div className="font-semibold text-gray-700 mb-1">
								Refresh Token
							</div>
							<div className="bg-gray-100 p-2 rounded overflow-x-auto">
								<code className="text-xs">{auth.user.refresh_token}</code>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};
