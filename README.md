# Volecco Landing Page

![Volecco desktop hero](screens/desktop-hero.jpeg)

Volecco is an exploratory checklist navigator for moments when people feel unsure about what they might be forgetting: travel preparation, moving, birth preparation, and other life events.

This repository contains the standalone landing page prototype for Volecco. It is intended to show the product idea, visual direction, and core interaction concept so people can give feedback before the full web application is ready.

## What This Is

- A static landing page prototype for the Volecco product idea.
- A feedback artifact for sharing on places like Reddit, GitHub, or private review links.
- A visual exploration of Volecco's split-flap departure-board identity.
- A lightweight demo of the checklist execution experience, including Next Action, JourneyTrack, and Focus Mode concepts.

## What Volecco Is

Volecco is not a generic todo app. The product concept is a curated checklist library where users can find trusted checklists, copy them to their own library, customize them, and work through them one item at a time.

The first product direction focuses on:

- Travel preparation
- Moving and first apartments
- Birth preparation

The goal is to reduce uncertainty and help people feel, "I know what to do next."

## Current Status

This landing page is a prototype. It does not include the production Volecco app, authentication, Supabase data, account features, payments, analytics, user-generated checklist publishing, ratings, reviews, AI generation, reminders, or calendar integration.

The page intentionally avoids fake traction metrics, fake stars, fake reviews, and fake user activity. The demo data is illustrative only.

## Files

Key files:

- `Volecco-Landing.html` - HTML entry file for the current prototype.
- `landing.jsx` - landing page shell and navigation behavior.
- `landing-sections.jsx` - page sections and copy.
- `landing-mockups.jsx` - interactive mockups and board components.
- `landing.css` - landing-page-specific styles.
- `styles.css` - shared visual system and reusable UI styles.
- `flap.jsx` - split-flap display component.
- `ui.jsx` and `icons.jsx` - local UI helpers and icons.
- `screens/` - reference screenshots.

If this folder is moved into a standalone deployment repository, you can rename `Volecco-Landing.html` to `index.html` for a simpler Vercel setup.

## Run Locally

Because this prototype uses React and Babel from CDN script tags, run it through a local HTTP server instead of opening the HTML file directly.

```bash
python3 -m http.server 8756
```

Then open:

```text
http://localhost:8756/Volecco-Landing.html
```

If you renamed the entry file to `index.html`, open:

```text
http://localhost:8756/
```

## Deploy on Vercel

For a simple static deployment:

- Framework Preset: `Other`
- Build Command: leave empty
- Output Directory: leave empty
- Root Directory: repository root
- Environment Variables: none required

For the smoothest deployment, make sure the repository root contains `index.html`.

## Design Notes

The landing page uses an airport departure-board motif:

- SplitFlap for changing states and progress.
- JourneyTrack for visualizing checklist progress.
- BoardTag labels for status-like UI.
- A calm, structured visual tone rather than productivity-tool clutter.

The copy is deliberately modest. It describes Volecco as a checklist navigator and avoids promising features that are outside the current MVP direction.

## License

No open-source license has been selected yet. Until a license is added, all rights are reserved by default.

---

# Volecco ランディングページ

![Volecco desktop hero](screens/desktop-hero.jpeg)

Volecco は、海外旅行、引越し、出産準備など、人生の節目で「何か大切なことを忘れているかもしれない」と感じる場面のためのチェックリスト・ナビゲーターです。

このリポジトリには、Volecco のランディングページ用プロトタイプを収めています。正式なWebアプリ本体ではなく、プロダクトの考え方、見た目の方向性、主要な体験を見てもらい、フィードバックを受け取るための公開用モックです。

## これは何か

- Volecco のプロダクト案を伝える静的ランディングページです。
- Reddit、GitHub、限定公開URLなどで意見をもらうためのフィードバック用成果物です。
- 空港のフラップ式出発案内板から着想したビジュアル方向性の試作です。
- Next Action、JourneyTrack、Focus Mode など、チェックリスト実行体験の一部を軽く触れるデモです。

## Volecco とは

Volecco は汎用的なTodoアプリではありません。信頼できるチェックリストを見つけ、自分のマイライブラリへコピーし、自分用に調整しながら、チェック項目をひとつずつ進めるためのチェックリスト・ライブラリです。

初期のプロダクト方向性では、次の領域にフォーカスしています。

- 海外旅行の準備
- 引越し / 一人暮らしの開始
- 出産準備

目指しているのは、「次に何をすればいいか分かる」という安心感です。

## 現在の状態

このランディングページはプロトタイプです。正式な Volecco アプリ本体、認証、Supabase連携、アカウント機能、課金、分析、ユーザー投稿チェックリスト公開、評価、レビュー、AI生成、リマインダー、カレンダー連携は含まれていません。

また、実態のない利用者数、星評価、レビュー、ユーザーアクティビティは載せない方針です。デモ内のデータは説明用のサンプルです。

## ファイル構成

主なファイル:

- `Volecco-Landing.html` - 現在のプロトタイプのHTMLエントリです。
- `landing.jsx` - ランディングページ全体の構成とナビゲーション挙動です。
- `landing-sections.jsx` - ページ各セクションとコピーです。
- `landing-mockups.jsx` - インタラクティブなモックとボード系コンポーネントです。
- `landing.css` - ランディングページ固有のスタイルです。
- `styles.css` - 共通ビジュアルシステムと再利用UIスタイルです。
- `flap.jsx` - フラップ式表示コンポーネントです。
- `ui.jsx` / `icons.jsx` - ローカルUIヘルパーとアイコンです。
- `screens/` - 参照用スクリーンショットです。

このフォルダを単独のデプロイ用リポジトリへ移す場合は、Vercelで扱いやすくするために `Volecco-Landing.html` を `index.html` にリネームできます。

## ローカルで見る

このプロトタイプは React と Babel を CDN の script タグから読み込んでいるため、HTMLファイルを直接開くのではなく、ローカルHTTPサーバ経由で確認してください。

```bash
python3 -m http.server 8756
```

その後、次のURLを開きます。

```text
http://localhost:8756/Volecco-Landing.html
```

エントリファイルを `index.html` にリネームした場合は、次のURLで開けます。

```text
http://localhost:8756/
```

## Vercel でデプロイする

静的サイトとしてデプロイする場合は、以下の設定で始められます。

- Framework Preset: `Other`
- Build Command: 空欄
- Output Directory: 空欄
- Root Directory: リポジトリルート
- Environment Variables: 不要

一番スムーズにデプロイするには、リポジトリルートに `index.html` を置いてください。

## デザインメモ

このランディングページは、空港の出発案内板をモチーフにしています。

- 状況や進捗の変化を表す SplitFlap
- チェックリストの進行を見せる JourneyTrack
- ステータス風の BoardTag
- 生産性ツールらしい情報過多ではなく、落ち着いて整理されたトーン

コピーは意図的に控えめにしています。Volecco をチェックリスト・ナビゲーターとして説明し、現在のMVP方向性に含まれない機能は約束しません。

## ライセンス

現時点ではオープンソースライセンスは選定していません。ライセンスファイルが追加されるまでは、デフォルトで all rights reserved として扱います。
