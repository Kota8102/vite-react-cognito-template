/**
 * ローディング画面コンポーネント
 * Viteのぐるぐるアニメーションを表示します
 */
export const LoadingSpinner = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
			<div className="text-xl font-medium">読み込み中...</div>
		</div>
	);
}

/**
 * エラー画面コンポーネント
 */
export const ErrorDisplay = ({ message }: { message: string }) => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center">
			<div className="text-2xl text-red-500 mb-4">エラーが発生しました</div>
			<div className="text-lg">{message}</div>
		</div>
	);
}
