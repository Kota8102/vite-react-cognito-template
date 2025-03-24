# Vite + React + Cognito テンプレート

このプロジェクトは、Vite、React、AWS Cognitoを使用したウェブアプリケーション開発のためのスターターテンプレートです。

## 技術スタック

### フロントエンド（web/）

- **コアフレームワーク**
  - [React](https://react.dev/) 19 - UIコンポーネントライブラリ
  - [TypeScript](https://www.typescriptlang.org/) - 型安全な開発環境
  - [Vite](https://vitejs.dev/) 6 - 高速な開発・ビルドツール

- **UI/UX**
  - [shadcn/ui](https://ui.shadcn.com/) - カスタマイズ可能なUIコンポーネント

- **開発ツール**
  - [Biome](https://biomejs.dev/) - 高速なリンター・フォーマッター
  - [Vitest](https://vitest.dev/) - ユニットテストフレームワーク

### バックエンド（cdk/）

- **インフラストラクチャ**
  - [AWS CDK](https://aws.amazon.com/jp/cdk/) v2 - AWSリソースのコード化
  - [Amazon Cognito](https://aws.amazon.com/jp/cognito/) - ユーザー認証サービス

- **開発ツール**
  - [TypeScript](https://www.typescriptlang.org/) - 型安全なインフラコード
  - [ts-node](https://typestrong.org/ts-node/) - TypeScript実行環境

## プロジェクト構造

プロジェクトは、フロントエンド（`web/`）とインフラストラクチャ（`cdk/`）の2つの主要ディレクトリに分かれています。

### フロントエンド構造（web/）

```bash
web/
├── src/                  # ソースコード
│   ├── app/              # アプリケーション層
│   │   ├── routes/       # ルート定義
│   │   │   ├── app/      # 認証済みルート
│   │   │   └── auth/     # 認証関連ルート
│   │   ├── app.tsx       # メインアプリケーション
│   │   ├── provider.tsx  # グローバルプロバイダー
│   │   └── router.tsx    # ルーター設定
│   ├── assets/           # 静的ファイル
│   ├── components/       # 共有コンポーネント
│   ├── config/           # 設定ファイル
│   ├── features/         # 機能モジュール
│   ├── hooks/            # 共有フック
│   ├── lib/              # ライブラリ
│   ├── stores/           # 状態管理
│   ├── types/            # 型定義
│   └── utils/            # ユーティリティ
├── public/               # 静的ファイル
├── index.html            # HTMLテンプレート
└── vite.config.ts        # Vite設定
```

### インフラストラクチャ構造（cdk/）

```bash
cdk/
├── bin/                 # CDKエントリーポイント
│   └── cdk.ts           # スタック初期化
├── lib/                 # メインコード
│   ├── cdk-stack.ts     # メインスタック
│   └── construct/       # 再利用可能なConstruct
│       └── auth.ts      # 認証Construct
└── test/                # テスト
    ├── cdk.test.ts      # CDKテスト
    └── snapshot.test.ts # スナップショットテスト
```

## 特徴

- ⚡️ **高速な開発体験** - Viteによる高速な開発サーバーとHMR
- 🔒 **統合認証** - Amazon Cognitoによる安全な認証システム
- 📦 **モジュラー構造** - 機能ベースのディレクトリ構造
- 🚀 **インフラのコード化** - CDKによるクラウドリソースの管理
- 🎨 **美しいUI** - shadcn/uiコンポーネントライブラリ
- 🛠️ **型安全** - TypeScriptによる堅牢な開発体験
- 🧪 **テスト環境** - Vitestによる単体テスト

## 始め方

### 前提条件

- Node.js 18.x以上
- npm 9.x以上
- AWSアカウントとアクセス権限
- AWS CLIのセットアップと認証設定

### インストール

1. リポジトリのクローン:

```bash
git clone <リポジトリURL>
cd <プロジェクト名>
```

2. 依存関係のインストール:

```bash
npm ci
```

### 環境変数の設定

フロントエンド（web/）で環境変数を設定します:

```bash
cd web
cp .env.example .env
```

`.env`ファイルを編集し、以下の変数を設定します:

```bash
# Cognito認証設定
VITE_COGNITO_REGION=ap-northeast-1
VITE_COGNITO_USER_POOL_ID=ap-northeast-1_xxxxxxxxx
VITE_COGNITO_CLIENT_ID=1234567890abcdefghijklmnop
VITE_COGNITO_REDIRECT_URI=http://localhost:5173
VITE_COGNITO_DOMAIN=https://your-domain.auth.ap-northeast-1.amazoncognito.com
```

### インフラのデプロイ

AWS CDKを使用してバックエンドインフラをデプロイします:

```bash
cd cdk

# AWSプロファイルの設定（必要に応じて）
export AWS_PROFILE=your-profile

# CDKの初期化（初回のみ）
npx cdk bootstrap

# スタックのデプロイ
npm run cdk deploy
```

デプロイ後、出力されるCognito情報を`.env`ファイルに設定します。

### フロントエンドの実行

```bash
cd web
npm run dev
```

ブラウザで <http://localhost:5173> を開くとアプリケーションにアクセスできます。

## 開発ワークフロー

### コード品質の管理

[Biome](https://biomejs.dev/)を使用してコードの品質を保ちます:

```bash
# フォーマットとリントのチェック
npm run check

# 問題の自動修正
npm run format
```

### Markdownドキュメントの管理

[markdownlint](https://github.com/DavidAnson/markdownlint)を使用してドキュメントの品質を管理:

```bash
# Markdownのチェック
npm run markdown:check

# 自動修正
npm run markdown:fix
```

### テスト実行

```bash
# フロントエンドのテスト
cd web
npm run test

# インフラのテスト
cd cdk
npm run test
```

## 機能モジュールの追加

新しい機能を追加する際は、`features/`ディレクトリに新しいモジュールを作成します:

```bash
src/features/your-feature/
├── api/         # API関連
├── components/  # UIコンポーネント
├── hooks/       # カスタムフック
├── stores/      # 状態管理
├── types/       # 型定義
└── utils/       # ユーティリティ
```

## 推奨開発環境

- [VS Code](https://code.visualstudio.com/)
- 拡張機能:
  - [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [AWS Toolkit](https://marketplace.visualstudio.com/items?itemName=amazonwebservices.aws-toolkit-vscode)

## トラブルシューティング

### よくある問題

- **認証エラー**: `.env`ファイルのCognito設定を確認してください
- **ビルドエラー**: 依存関係が最新かどうか確認してください
- **CDKデプロイエラー**: AWSの認証情報と権限を確認してください

詳細なトラブルシューティングについては、[Wiki](リンク)を参照してください。

## ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。
