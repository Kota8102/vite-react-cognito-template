# Vite + React + Cognito テンプレート

このプロジェクトは、以下の技術スタックを使用したウェブアプリケーション開発のためのテンプレートです。

## 技術スタック

### フロントエンド（web/）

#### メインフレームワーク

- [React](https://react.dev/) 19 - ユーザーインターフェース構築のためのライブラリ
- [TypeScript](https://www.typescriptlang.org/) - 静的型付けによる堅牢な開発
- [Vite](https://vitejs.dev/) 6 - 高速な開発環境とビルドツール

#### 開発ツール

- [Biome](https://biomejs.dev/) - リンターとフォーマッター
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - ReactのViteプラグイン
- [shadcn/ui](https://ui.shadcn.com/) - 再利用可能なUIコンポーネント

### インフラストラクチャ（cdk/）

#### フレームワーク

- [AWS CDK](https://aws.amazon.com/jp/cdk/) v2 - AWSリソースのインフラストラクチャ管理
- [TypeScript](https://www.typescriptlang.org/) - 型安全なインフラコード

#### テスト

- [Vitest](https://vitest.dev/) - ユニットテストフレームワーク

- [Biome](https://biomejs.dev/) - リンターとフォーマッター
- [ts-node](https://typestrong.org/ts-node/) - TypeScriptの実行環境

## プロジェクト構造

```bash
.
├── web/                      # フロントエンドアプリケーション（Vite + React）
│   ├── src/                 # ソースコード
│   │   ├── app/            # アプリケーション層
│   │   │   ├── routes/    # アプリケーションのルート定義
│   │   │   │   ├── app/  # 認証済みルート
│   │   │   │   └── auth/ # 認証関連ルート
│   │   │   ├── app.tsx    # メインアプリケーションコンポーネント
│   │   │   ├── provider.tsx # グローバルプロバイダー
│   │   │   └── router.tsx  # ルーター設定
│   │   ├── assets/        # 静的ファイル（画像、フォントなど）
│   │   ├── components/    # 共有コンポーネント
│   │   │   ├── layouts/  # レイアウトコンポーネント
│   │   │   └── ui/      # UIコンポーネント（shadcn/ui）
│   │   ├── config/       # グローバル設定、環境変数など
│   │   ├── features/     # 機能ベースのモジュール
│   │   │   └── [feature]/ # 各機能のフォルダ
│   │   │       ├── api/      # API関連
│   │   │       ├── assets/   # 機能固有の静的ファイル
│   │   │       ├── components/ # 機能スコープのコンポーネント
│   │   │       ├── hooks/    # 機能スコープのフック
│   │   │       ├── stores/   # 機能の状態管理
│   │   │       ├── types/    # 型定義
│   │   │       └── utils/    # ユーティリティ関数
│   │   ├── hooks/         # 共有フック
│   │   ├── lib/          # アプリケーション用ライブラリ
│   │   ├── stores/       # グローバル状態管理
│   │   ├── testing/      # テストユーティリティとモック
│   │   ├── types/        # 共有の型定義
│   │   └── utils/        # 共有ユーティリティ関数
│   ├── public/           # 静的ファイル
│   ├── index.html        # HTMLテンプレート
│   └── vite.config.ts    # Viteの設定
└── cdk/                   # AWSインフラストラクチャコード
    ├── bin/              # CDKアプリケーションのエントリーポイント
    │   └── cdk.ts       # スタックの初期化と環境設定
    ├── lib/              # インフラストラクチャコードのメイン
    │   ├── cdk-stack.ts # メインスタック定義
    │   └── construct/   # 再利用可能なConstruct
    │       └── auth.ts  # 認証関連のConstruct
    └── test/             # テストコード
        ├── cdk.test.ts  # CDKテスト
        └── snapshot.test.ts # スナップショットテスト

```

### CDKディレクトリ構造の説明

#### `bin/`

- CDKアプリケーションのエントリーポイント
- 環境変数の設定と読み込み
- スタックの初期化と環境別の設定

#### `lib/`

- `cdk-stack.ts`: メインスタック定義
  - 全体のリソース構成を定義
  - 各Constructの組み合わせを管理
- `construct/`: 再利用可能なAWSリソース
  - 機能ごとに分割された独立したConstruct
  - 単一責任の原則に従った設計
  - 他プロジェクトでの再利用を考慮

#### `test/`

- インフラストラクチャコードのテスト
- スナップショットテスト
- リソース構成の検証

## 開発の始め方

### 環境変数の設定

このプロジェクトでは、セキュリティ上の理由から認証情報などの機密情報を環境変数として管理しています。以下の手順で環境変数を設定してください：

1. `web/.env.example`ファイルをコピーして`web/.env`ファイルを作成します：

```bash
cd web
cp .env.example .env
```

2. `.env`ファイルを編集して、必要な環境変数を設定します：

```
# Cognito認証設定
VITE_COGNITO_REGION=your-region
VITE_COGNITO_USER_POOL_ID=your-user-pool-id
VITE_COGNITO_CLIENT_ID=your-client-id
VITE_COGNITO_REDIRECT_URI=http://localhost:5173
VITE_COGNITO_DOMAIN=https://your-domain-prefix.auth.your-region.amazoncognito.com
```

各環境変数の説明：

- `VITE_COGNITO_REGION`: AWS Cognitoのリージョン（例：us-east-1）
- `VITE_COGNITO_USER_POOL_ID`: Cognito User PoolのID
- `VITE_COGNITO_CLIENT_ID`: Cognito App ClientのID
- `VITE_COGNITO_REDIRECT_URI`: 認証後のリダイレクトURI（デフォルトはViteのローカル開発サーバー）
- `VITE_COGNITO_DOMAIN`: Cognitoのドメイン

**注意**: `.env`ファイルには機密情報が含まれるため、Gitリポジトリにコミットしないでください。`.gitignore`ファイルに`.env`が含まれていることを確認してください。

### フロントエンド開発

```bash
cd web
npm install
npm run dev
```

### インフラストラクチャの開発

```bash
cd cdk
npm install
npm run cdk deploy
```

## 主な機能

- ⚡️ Viteによる高速な開発体験
- 📦 機能ベースのモジュール構造
- 🔒 Amazon Cognitoを使用した認証機能
- 🚀 CDKを使用したインフラストラクチャのコード化
- 📁 スケーラブルなプロジェクト構造
- 🎨 shadcn/uiによる美しいUIコンポーネント
- 🛠️ TypeScriptによる型安全な開発
- 🧪 Vitestによるテスト環境

## コードの品質管理

このプロジェクトは、以下のツールを使用してコードの品質を管理しています：

### Biome

[Biome](https://biomejs.dev/)は高速で設定の簡単な、オールインワンのツールチェーンです。

webディレクトリとcdkディレクトリの両方で以下のコマンドが利用可能です：

```bash
# フォーマットとリントのチェック
npm run check

# 問題の自動修正を試みる
npm run format
```

### markdownlint

Markdownファイルの品質管理には[markdownlint](https://github.com/DavidAnson/markdownlint)を使用しています。

```bash
# Markdownファイルのチェック
npm run markdown:check

# 自動修正可能な問題を修正
npm run markdown:fix
```

## コーディングスタイル

詳細なコーディング規約については[.clinerules](./.clinerules)を参照してください。

## 推奨IDE設定

- [VS Code](https://code.visualstudio.com/)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
