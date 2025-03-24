# Vite + React + Cognito テンプレート

このプロジェクトは、以下の技術スタックを使用したウェブアプリケーション開発のためのテンプレートです：

- [Vite](https://vitejs.dev/) - 高速な開発環境とビルドツール
- [React](https://react.dev/) - ユーザーインターフェース構築のためのライブラリ
- [AWS CDK](https://aws.amazon.com/jp/cdk/) - AWSリソースのインフラストラクチャ管理

## プロジェクト構造

```bash
.
├── web/                      # フロントエンドアプリケーション（Vite + React）
│   ├── src/                 # ソースコード
│   │   ├── app/            # アプリケーション層
│   │   │   ├── routes/    # アプリケーションのルート定義
│   │   │   ├── app.tsx    # メインアプリケーションコンポーネント
│   │   │   ├── provider.tsx # グローバルプロバイダー
│   │   │   └── router.tsx  # ルーター設定
│   │   ├── assets/        # 静的ファイル（画像、フォントなど）
│   │   ├── components/    # 共有コンポーネント
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
│   └── vite.config.js    # Viteの設定
└── cdk/                   # AWSインフラストラクチャコード
    ├── bin/              # CDKアプリケーションのエントリーポイント
    │   └── cdk.ts       # スタックの初期化と環境設定
    ├── lib/              # インフラストラクチャコードのメイン
    │   ├── cdk-stack.ts # メインスタック定義
    │   └── construct/   # 再利用可能なConstruct
    │       ├── auth.ts  # 認証関連のConstruct
    │       ├── storage.ts # ストレージ関連のConstruct
    │       └── api.ts   # API関連のConstruct
    └── test/             # テストコード
        └── *.test.ts    # 各種テストファイル
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

## 推奨IDE設定

- [VS Code](https://code.visualstudio.com/)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

## コードの品質管理

このプロジェクトはコードの品質管理のために[Biome](https://biomejs.dev/)を使用しています。Biomeは高速で設定の簡単な、オールインワンのツールチェーンです。

### 利用可能なコマンド

webディレクトリとcdkディレクトリの両方で以下のコマンドが利用可能です：

```bash
# コードのフォーマット
npm run format

# リントチェック
npm run lint

# フォーマットとリントの両方をチェック
npm run check
```

### Biomeの特徴

- ⚡️ 高速な実行速度
- 🔧 最小限の設定で開始可能
- 📦 フォーマッター、リンター、整理ツールが統合
- 🚀 TypeScriptとJavaScriptの完全サポート
