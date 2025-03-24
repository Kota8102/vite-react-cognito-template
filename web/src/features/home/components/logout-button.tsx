import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "react-oidc-context";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const LogoutButton = () => {
	const auth = useAuth();
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await new Promise((resolve) => setTimeout(resolve, 500)); // ログアウト処理の視覚的フィードバック用
			signOut(auth);
		} catch (error) {
			console.error("ログアウト中にエラーが発生しました:", error);
		} finally {
			setIsLoggingOut(false);
			setShowConfirmDialog(false);
		}
	};

	return (
		<>
			<Button
				variant="destructive"
				onClick={() => setShowConfirmDialog(true)}
				className="gap-2"
			>
				<LogOut className="h-4 w-4" />
				ログアウト
			</Button>

			<AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>ログアウトしますか？</AlertDialogTitle>
						<AlertDialogDescription>
							ログアウトすると、現在のセッションが終了します。
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>キャンセル</AlertDialogCancel>
						<AlertDialogAction onClick={handleLogout} disabled={isLoggingOut}>
							{isLoggingOut ? "処理中..." : "ログアウト"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
