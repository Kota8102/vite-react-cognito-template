/**
 * アプリケーション内のルートパスを定義
 * パスの一元管理により、変更が必要な場合も一箇所で対応可能
 */
export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
} as const;