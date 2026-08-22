# Quick Clip - App Clipで5秒決済を実現

Quick ClipはApp Clipを活用した革新的なQRコード決済ソリューションのランディングページです。

> [!IMPORTANT]
> 現在のSEO/AIO改善、担当者、完了条件は [honkoma SEO / AIO タスクボード](docs/seo-aio-task-board.md) を正本として管理しています。GEO監査の指摘内容と対応タスクのつながりは [GEO監査アクションビュー](docs/geo-audit-todo.md) を参照してください。いずれの内部文書も公開サイトには表示しません。

## SEO対策について

このプロジェクトには以下の完璧なSEO対策が実装されています：

### 1. メタタグ最適化
- 日本語に特化したタイトルとディスクリプション
- App Clip、QRコード決済に関連するキーワード最適化
- Open Graph（Facebook/LinkedIn）対応
- Twitter Card対応
- 正規URL（canonical）設定

### 2. 構造化データ（JSON-LD）
- SoftwareApplication スキーマ
- Organization スキーマ
- WebPage スキーマ
- Product スキーマ

### 3. セマンティックHTML
- 適切なHTMLタグ（header, main, section, article, aside）
- ARIA属性によるアクセシビリティ対応
- 見出しタグの階層構造

### 4. パフォーマンス最適化
- 重要リソースのプリロード
- DNS プリフェッチ
- 画像の遅延読み込み
- フォントの最適化

### 5. サイトマップとrobots.txt
- XML サイトマップ（sitemap.xml）
- robots.txt による検索エンジン制御

### 6. PWA対応
- Web App Manifest
- アイコン設定

### 7. セキュリティヘッダー
- .htaccess による各種セキュリティヘッダー設定
- HTTPS リダイレクト

## 開発環境のセットアップ

### 前提条件
[NodeJS](https://nodejs.org/en/) がシステムにインストールされている必要があります。

### インストール
```bash
npm install
```

### 開発サーバー起動
```bash
npm run dev
```

開発サーバーは [http://localhost:5173/](http://localhost:5173/) でアクセスできます。

### プロダクションビルド
```bash
npm run build
```

## Google Analytics 4（GA4）

このサイトには Google Analytics 4（GA4）が導入されています。

- 測定ID: `G-2Y4FMJB6GB`
- `gtag.js` を全ページ共通のエントリーポイントで読み込み、GA4を初期化
- お問い合わせフォームおよび口コミAI診断フォームの送信時に `form_submit` イベントを計測

### GA4プロパティへのアクセス

- アカウント名: `Default Account for Firebase`
- GAアカウントID: `351570105`
- プロパティ名: `honkoma LP`
- プロパティID: `528400146`
- アクセス用Googleアカウント: `quickclip@ltdhonkoma.com`
- [GA4レポートを開く（端末共通）](https://analytics.google.com/analytics/web/#/a351570105p528400146/reports/intelligenthome?params=_u..nav%3Dmaui)
- [GA4レポートを開く（このMacの一時ショートカット）](https://analytics.google.com/analytics/web/?authuser=1#/a351570105p528400146/reports/intelligenthome?params=_u..nav%3Dmaui)

`authuser=1` は、このMacのChromeにおけるGoogleアカウントのログイン順を表す一時的な値です。端末やChromeプロファイルが変わると番号も変わる可能性があるため、他のデバイスでは `quickclip@ltdhonkoma.com` でログインしてから端末共通リンクを使用してください。確認時は、プロパティ名が `honkoma LP`、プロパティIDが `528400146`、測定IDが `G-2Y4FMJB6GB` であることを照合してください。

## SEO チェックリスト

デプロイ前に以下を確認してください：

- [x] Google Analytics 4（GA4）の測定IDを設定
- [ ] OG画像（og-image.jpg）を実際の画像に置き換え
- [ ] ファビコンファイルを配置
- [ ] サイトマップの最終更新日を更新
- [ ] 本番URLでcanonical URLを更新

## 技術スタック

- React + TypeScript
- Tailwind CSS
- Vite
- Supabase（お問い合わせフォーム）
- Framer Motion（アニメーション）

```

```

```
