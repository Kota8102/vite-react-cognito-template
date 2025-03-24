import { UserInfo, LogoutButton } from "@/features/home/components";
import { ContentLayout } from "@/components/layouts";

/**
 * ホーム画面コンポーネント
 * 認証済みユーザー向けの画面を表示します
 */
export const HomePage = () => {
	return (
		<ContentLayout title="ホーム">
			<div className="min-h-screen flex flex-col items-center justify-center">
				<UserInfo />
				<div className="flex justify-center p-5">
					<LogoutButton />
				</div>
			</div>
		</ContentLayout>
	);
};
