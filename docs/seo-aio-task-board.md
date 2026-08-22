# honkoma SEO / AIO タスクボード

最終更新: 2026-07-21

対象サイト: `https://ltdhonkoma.com/`

目的: SEO（検索エンジン最適化）とAIO（AI検索・回答で正しく発見、理解、引用されるための改善）を、番号順に1件ずつ完了させる。

このファイルがタスクの正本です。チャット、口頭、GitHub Issueに同じ内容を複製せず、状態・担当・証跡は必ずここへ戻します。

## 最初に読むところ

### 現在のボール

| 担当 | 今持っているボール | 次にやること |
| --- | --- | --- |
| ユーザー | `SEO-AIO-060` | Search ConsoleのKizunaFinderサブドメイン削除申請を最終承認する |
| Codex | `SEO-AIO-061` | Google申請後、Bingと外部検索面の削除・残存確認へ進む |
| Claude Code | 待機 | `SEO-AIO-013` の独立監査を、前提タスク完了後に実施する |
| Fable | 待機 | `SEO-AIO-012` の設計レビューを、正規ドメイン確定後に実施する |

### 進め方

ユーザーはCodexに「`SEO-AIO-001`を進めて」のようにIDを1つ指定します。担当者はそのタスクだけを進め、完了条件を検証し、証跡を記録してから次のIDへ移ります。

- `🔜 次`: 前提がそろっており、次に着手できる
- `⬜ 未着手`: まだ着手していない
- `🚧 進行中`: 担当者が作業中
- `⏳ 確認待ち`: 人の判断、許諾、外部サービスの確認を待っている
- `🛑 ブロック`: 依存タスクが終わるまで進められない
- `✅ 完了`: 完了条件を満たし、証跡がある

## 担当の境界

「ボール」は、次の具体的な行動をする人を1人だけ示します。相談相手やレビュー担当はボール保持者に含めません。

| 担当 | 受け持つこと | 受け持たないこと |
| --- | --- | --- |
| ユーザー | 会社の事実、公開可否、許諾、料金、正規ドメイン、外部アカウントの最終判断 | コード修正、機械的監査 |
| Codex | 全体進行、リポジトリ編集、テスト、ブラウザ確認、Git/PR、外部設定の手順化、証跡統合 | 根拠のない会社情報の決定 |
| Claude Code | IDで範囲を固定した独立監査、機械的な照合、テスト案、明示依頼がある場合の限定実装 | 最終判断、deploy、push、外部アカウント操作 |
| Fable | 情報設計、優先順位、トレードオフ、コピー構造の読み取り専用レビュー | ファイル編集、テスト、deploy、push |

## 対象範囲

- 対象: `ltdhonkoma.com` の企業サイト、正規プロフィール、検索・AIクローラー、GA4、Search Console、Bing Webmaster Tools、サイトに根拠を与える第三者情報
- KizunaFinder: 別プロダクトとして保持してよい。企業サイトの現行ルート、ナビゲーション、構造化データ、サイトマップ、ビルド成果物へ混入させない
- KizunaFinderの例外範囲: 提供終了に伴う公開停止、検索非表示、honkomaとの関連付け解消だけは本ボードで管理する
- 対象外: KizunaFinder自体の集客SEO、機能、料金、MCP化、プロダクト改善
- 公開境界: この内部ボードを企業サイトのヘッダー、フッター、公開ページには表示しない

## 0. 運用と前提

| ID | 状態 | ボール | やること・理由 | 次の一手 | 完了条件・証跡 |
| --- | --- | --- | --- | --- | --- |
| `SEO-AIO-000` | ✅ 完了 | Codex | この番号付きボードと4者の役割を作る | 運用開始 | commit `a7d352f`、Codex専用タスク `client-new-thread:7d7d104c-5a55-4fa1-b6fa-c52103cf8f0a` を作成・ピン留め（2026-07-21） |
| `SEO-AIO-001` | 🔜 次 | ユーザー | 検索・AIが正規URLを誤認しないよう、正規ドメインを1つ決める | `ltdhonkoma.com` を正規とするか明言する | 正規ドメイン、旧ドメインの扱い、リダイレクト方針が1行で確定 |
| `SEO-AIO-002` | 🔜 次 | ユーザー | 会社名、設立、代表、所在地、人数、実績数の正データを確定する | 登記住所とHP掲載住所、設立月、人数、実績定義を確認する | 日付付きの会社正データ表が承認される。GitHub Issue [#12](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/12) と対応 |
| `SEO-AIO-003` | 🔜 次 | ユーザー | 数値、料金、事例、ロゴを公開できる根拠台帳を作る | `98%`、`20/30社`、`最短2週間`、料金、BuySell許諾の証拠を集める | 各主張が「公開可・要修正・削除」に分類され、根拠URLまたは資料がある |
| `SEO-AIO-004` | 🔜 次 | Codex | 本番とrepoの内容が違う原因を特定し、どのbranch/commitが公開されるか明確にする | Vercel設定、production branch、最新deploy SHAを読み取る | `repo SHA → deploy → 本番表示` が一致し、確認日時を記録。GitHub Issue [#41](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/41) と対応 |
| `SEO-AIO-005` | 🛑 ブロック | Codex | KizunaFinderを除外し、`ltdhonkoma.com/*` だけでSEO/AIO基準値を取り直す | `001` と `004` 完了後にGEO監査を再実行する | 対象URL、取得日時、スコア、引用URL、未確認項目が残るレポートを保存 |
| `SEO-AIO-006` | ⬜ 未着手 | Codex | READMEの「Quick Clip」「完璧なSEO」など現状と違う説明を直す | 現行サイト、開発手順、GA4、ボード導線を事実ベースで書く | READMEだけで現在のプロジェクトと未完了事項を誤解なく説明できる |
| `SEO-AIO-007` | ✅ 完了 | Codex | 2026-07-17 GEO監査の有効部分と除外部分を記録する | 継続監視へ移行 | [`docs/geo-audit-todo.md`](./geo-audit-todo.md) に監査日（2026-07-17）、対象（`ltdhonkoma.com`）、スコア（34/100、信頼度: 中）、採用部分（GEO-F001〜GEO-F010→GEO-TODO-01〜10）、除外部分（GEO-F011・GEO-F012、Kizuna固有/仮説的将来構想として対象外）を記録（2026-07-21）。元の貼り付けテキストファイルは後に空になり、当時のCodexタスクログから内容を復元したことを明記 |
| `SEO-AIO-008` | ✅ 完了 | Codex | KizunaFinderを削除せず、企業サイトから非接続にする | 現行route、バンドル、公開ページを確認済み | `src/index.tsx`、本番バンドル、公開ホーム/サービスに文字列・リンク・画像参照なし（2026-07-21確認） |
| `SEO-AIO-009` | ⬜ 未着手 | Codex | 全公開URLの台帳を作り、index対象・非対象を決める | route、canonical、status、title、更新責任者を一覧化する | 全routeに正規URL、index方針、担当、最終確認日がある |

## 1. クロール、インデックス、URL正規化

| ID | 状態 | ボール | やること・理由 | 次の一手 | 完了条件・証跡 |
| --- | --- | --- | --- | --- | --- |
| `SEO-AIO-010` | 🛑 ブロック | Codex | canonical、robots、sitemapを正規ドメインへ統一する | `001` 確定後、`honkoma.jp` と `quickclip.honkoma.jp` を撤去する | HTML、robots、sitemap、内部リンクが同じ正規ドメインを指す。GitHub Issue [#13](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/13) と対応 |
| `SEO-AIO-011` | 🛑 ブロック | Codex | 各ページに固有title、description、自己参照canonical、OG URLを出す | `009` のURL台帳からページ別メタを実装する | 全index対象URLで重複・競合canonicalがなく、ソースHTMLと描画後DOMが一致 |
| `SEO-AIO-012` | 🛑 ブロック | Fable | SPAのまま進めるか、prerender/SSGを入れるか設計判断をレビューする | `001` と `009` 後、費用・運用・bot可視性を比較する | 推奨案、却下案、移行条件、検証方法が明文化され、Codexが採否を決定 |
| `SEO-AIO-013` | 🛑 ブロック | Claude Code | route、metadata、canonical、sitemapの独立監査を行う | `010` と `011` 後、実装とURL台帳を機械的に照合する | 不一致ゼロの監査表、または修正対象ID一覧が返る |
| `SEO-AIO-014` | ⬜ 未着手 | Codex | 古いドメイン、別名route、末尾スラッシュ、404を整理する | `/hotel` `/hotels` `/hasip` 等の正規URLとredirectを決める | 旧URLは正しい301/308、新規URLは2xx、存在しないURLは意味のある404 |
| `SEO-AIO-015` | ⬜ 未着手 | Codex | Googlebot、OAI-SearchBot、GPTBot、ChatGPT-Userの取得経路を分離確認する | robots、WAF/CDN、公開IP、status、本文量、最終URLを実機監査する | OAI-SearchBotで正規URLが2xx・本文取得可。GPTBot方針は別途明示。403/429を記録 |
| `SEO-AIO-016` | ⬜ 未着手 | Codex | sitemapを現行routeだけで再生成する | hash URLと古いlastmodを削除し、正規URLを列挙する | sitemap内URLがすべて正規・2xx・index対象。Search Console/Bingで受理 |
| `SEO-AIO-017` | ⬜ 未着手 | Codex | robots.txtを実態に合わせて簡潔にする | 無意味な`/.env`、`/node_modules/`、`Crawl-delay`を再評価する | sitemap URLが正しく、必要botの許可/拒否が意図どおり |
| `SEO-AIO-018` | ⬜ 未着手 | Codex | HTTPヘッダー、WAF、CDN cache、圧縮を確認する | production responseとbot別responseを記録する | 主要URLの2xx、content-type、cache、圧縮、security header、bot差分が確認済み |

## 2. 構造化データと検索表示

| ID | 状態 | ボール | やること・理由 | 次の一手 | 完了条件・証跡 |
| --- | --- | --- | --- | --- | --- |
| `SEO-AIO-019` | 🛑 ブロック | Codex | Organization/WebSite JSON-LDを正データへ直す | `002` 後、設立、人数、所在地、URL、ロゴ、sameAsを修正する | 可視本文とJSON-LDが一致し、古い渋谷区・2名・2025年7月が残らない |
| `SEO-AIO-020` | ⬜ 未着手 | Codex | Person、Service、BreadcrumbListを必要ページへ追加する | 代表・サービス・パンくずの正規IDを設計する | Schema ValidatorとRich Results Testで重大エラーなし。架空属性なし |
| `SEO-AIO-021` | ⬜ 未着手 | Codex | FAQ構造化データを表示内容と一致させる | index対象FAQだけをJSON-LD化する | 画面にないQ&Aをschemaへ入れず、全回答が本文と一致 |
| `SEO-AIO-022` | 🛑 ブロック | Claude Code | 構造化データと会社正データの独立照合を行う | `019`〜`021` 完了後に全schemaを監査する | 重複ID、古い事実、本文不一致、壊れたURLがゼロ |
| `SEO-AIO-023` | ⬜ 未着手 | Codex | OG画像、Twitter Card、favicon、manifestを正規URLへ揃える | 実在する画像と各ページのpreviewを確認する | SNSデバッガーで画像、title、descriptionが正しく表示される |

## 3. 会社情報、主張、コンテンツ

| ID | 状態 | ボール | やること・理由 | 次の一手 | 完了条件・証跡 |
| --- | --- | --- | --- | --- | --- |
| `SEO-AIO-024` | 🛑 ブロック | Codex | 会社概要の設立、人数、所在地、実績数を正す | `002` の承認値をAbout、footer、privacy、schemaへ反映する | 全公開面の会社属性が一致。GitHub Issue [#9](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/9)、[#12](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/12) と対応 |
| `SEO-AIO-025` | 🛑 ブロック | Codex | `98%`、`20社以上`、`最短2週間`などの無根拠/曖昧な数値を修正する | `003` の分類に従い、根拠追記・限定表現・削除を行う | 全数値に対象、期間、母数、測定方法または削除理由がある。Issue [#5](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/5)、[#8](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/8)、[#11](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/11) と対応 |
| `SEO-AIO-026` | 🛑 ブロック | Codex | サービス料金を1つの正モデルへ統一する | `003` の承認料金をhome/product/review-ai/FAQへ反映する | 同じサービスの初期費用・月額・条件が全ページ一致。Issue [#6](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/6) と対応 |
| `SEO-AIO-027` | 🛑 ブロック | ユーザー | BuySellの社名、ロゴ、コメント掲載許諾を確認する | 許諾範囲と引用可能文面を決める | 許諾証跡があるか、未許諾なら匿名化/削除方針が承認される |
| `SEO-AIO-028` | 🛑 ブロック | Codex | 導入事例を一次ソース付きにする | `003` と `027` 後、課題・期間・施策・結果・限界を掲載する | 各事例に確認者と根拠があり、架空/匿名の定量成果がない。Issue [#7](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/7) と対応 |
| `SEO-AIO-029` | ⬜ 未着手 | Claude Code | サービスページを「誰向け・何をする・料金・成果物・対象外」で独立監査する | 各ページの不足質問を一覧化する | ページ別の不足項目と修正案がID付きで返る |
| `SEO-AIO-030` | ⬜ 未着手 | Fable | AI検索にも人にも理解しやすい情報設計をレビューする | 会社、サービス、料金、事例、セキュリティ、FAQの階層を比較する | 推奨IA、優先質問、ページ境界が明文化され、Codexが採否を決定 |
| `SEO-AIO-031` | ⬜ 未着手 | Codex | セキュリティ、データ処理、保持、外部AI利用、問い合わせ先を説明する | 実運用を確認し、公開できる範囲のページを作る | 顧客が契約前にデータの流れ、保持、削除、責任範囲を確認できる |
| `SEO-AIO-032` | ⬜ 未着手 | Codex | 内部リンクとパンくずを整理する | 会社→サービス→事例→問い合わせの導線を作る | 重要ページが3クリック以内で到達でき、孤立ページゼロ |
| `SEO-AIO-033` | ⬜ 未着手 | Codex | 著者、監修、実質更新日、訂正窓口、変更履歴を表示する | 重要ページの責任者と更新ルールを決める | 重要事実の更新日と責任者が分かり、訂正依頼先がある |
| `SEO-AIO-034` | ⬜ 未着手 | Codex | 根拠のない競合推定価格・scarcity表現を撤去または根拠化する | review-ai比較表と「残りわずか」を監査する | 全比較セルに一次ソースと確認日があるか、表現が削除される。Issue [#14](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/14) と対応 |

## 4. AIO・AI検索での発見、引用、正答

| ID | 状態 | ボール | やること・理由 | 次の一手 | 完了条件・証跡 |
| --- | --- | --- | --- | --- | --- |
| `SEO-AIO-035` | 🛑 ブロック | Codex | 固定プロンプト集を作り、AI回答を同条件で比較できるようにする | `002` と `009` 後、指名・非指名・比較・誤情報修復質問を作る | 質問、期待事実、引用URL、判定基準が固定される。Kizuna質問は対象外 |
| `SEO-AIO-036` | 🛑 ブロック | Claude Code | 固定プロンプト結果を独立採点する | `035` 後、正答・引用・旧情報・競合言及を採点する | 同じrubricによる評価表と誤答パターンが残る |
| `SEO-AIO-037` | ⬜ 未着手 | Codex | 各ページ冒頭を、AIが抜き出せる直接回答型にする | 会社/サービス/料金/対象/制約を短い事実文で置く | 主要質問への答えが1ページ内で明示され、出典URLが一意 |
| `SEO-AIO-038` | ⬜ 未着手 | Codex | AI回答の引用元と誤情報を記録する台帳を作る | 回答、モデル、日付、検索有無、引用URL、誤りを保存する | 改善前後で引用率、正答率、旧情報率を比較できる |
| `SEO-AIO-039` | ⬜ 未着手 | ユーザー | LinkedIn、Google Business、GビズINFO、代表プロフィール等を現行情報へ揃える | 公開面の管理権限と正しい内容を確定する | 名称、URL、所在地、代表、事業説明が主要外部面で一致 |
| `SEO-AIO-040` | ⬜ 未着手 | ユーザー | 顧客、パートナー、登壇、寄稿など第三者の検証可能な言及を増やす | 公開可能な実績と協力先を選ぶ | サービス別に独立した一次/第三者ソースが増え、許諾が記録される |
| `SEO-AIO-041` | ⬜ 未着手 | Fable | `llms.txt` 等の非標準施策を採用する価値をレビューする | 公式仕様、運用負荷、誤解リスクを比較する | 採用/不採用理由が残る。SEO効果を保証する表現は使わない |

## 5. 計測、GA4、Search Console

| ID | 状態 | ボール | やること・理由 | 次の一手 | 完了条件・証跡 |
| --- | --- | --- | --- | --- | --- |
| `SEO-AIO-042` | ✅ 完了 | Codex | GA4測定コードとプロパティ確認手順をrepoへ記録する | 継続監視へ移行 | 測定ID `G-2Y4FMJB6GB`、プロパティID `528400146`、READMEをPR [#54](https://github.com/MaururuTakumi/honkoma-corporate-site/pull/54) でmerge（2026-07-21） |
| `SEO-AIO-043` | ⬜ 未着手 | Codex | GA4の現在値を基準値として保存する | 7/28/90日でユーザー、流入、landing、conversionを確認する | 期間・timezone・比較条件付きの基準レポートがある |
| `SEO-AIO-044` | ⬜ 未着手 | Codex | 問い合わせ、診断、CTA、予約のイベントとconversionを整理する | イベント名、発火条件、重複、debug viewを監査する | 主要ファネルがGA4で1回ずつ計測され、conversion定義が文書化 |
| `SEO-AIO-045` | ⬜ 未着手 | Codex | ChatGPT等の参照流入、UTM、first-touch/last-touchを分ける | referral、utm_source、landing、leadを接続する | AI/検索/直接/広告の流入と問い合わせを同じ定義で追える。Issue [#49](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/49) と対応 |
| `SEO-AIO-046` | ⏳ 確認待ち | ユーザー | 同意取得、GA4、問い合わせデータのプライバシー方針を決める | Cookie/計測同意の必要範囲を法務・運用観点で承認する | privacy本文と実装が一致し、未同意時の挙動が確認済み。Issue [#37](https://github.com/MaururuTakumi/honkoma-corporate-site/issues/37) と対応 |
| `SEO-AIO-047` | ⏳ 確認待ち | ユーザー | Google Search Consoleの正規プロパティと権限を確認する | domain propertyを選び、sitemapを送信できる状態にする | 所有権、index、canonical、CWV、sitemapを確認できる |
| `SEO-AIO-048` | ⏳ 確認待ち | ユーザー | Bing Webmaster Toolsを接続する | GSC importまたはdomain認証を行う | sitemap/URL inspection/index状況を確認できる |
| `SEO-AIO-049` | ⬜ 未着手 | Codex | SEO/AIOの週次ダッシュボードを作る | GA4、GSC、Bing、prompt評価、crawler logを同じ週で集計する | 指標定義、比較期間、異常閾値、次アクションが1画面で分かる |

## 6. 品質、速度、継続運用

| ID | 状態 | ボール | やること・理由 | 次の一手 | 完了条件・証跡 |
| --- | --- | --- | --- | --- | --- |
| `SEO-AIO-050` | ⬜ 未着手 | Codex | Core Web Vitalsとbundleを改善する | mobile/desktopのLCP、INP、CLS、JS量、画像を測る | 75パーセンタイルでLCP≤2.5秒、INP≤200ms、CLS≤0.1を目標に、未達理由を記録 |
| `SEO-AIO-051` | ⬜ 未着手 | Codex | 見出し、landmark、alt、keyboard、contrastを監査する | 自動a11y検査と実ブラウザ操作を行う | 主要フローに重大a11y違反がなく、見出し構造が意味順 |
| `SEO-AIO-052` | ⬜ 未着手 | Codex | SEO回帰テストとrelease checklistをCIへ入れる | route、title、canonical、schema、sitemap、禁止表現をテストする | PR時に不一致が自動検出され、deploy前チェックが残る |
| `SEO-AIO-053` | ⬜ 未着手 | Codex | 既存GitHub Issueと本ボードの対応を整理する | Issue #5〜#14、#37、#41、#49等へ本IDを対応付ける | 二重管理せず、各Issueから正本IDを辿れる |
| `SEO-AIO-054` | ⬜ 未着手 | Codex | 週1回の定点観測を自動化する | 正常時は記録のみ、変化/異常時だけCodexタスクを起動する | 重複automationなし。実行時刻、入力、出力、異常条件、停止条件が明確 |
| `SEO-AIO-055` | ⬜ 未着手 | Claude Code | 月1回、repoと本番の独立監査を行う | 正データ、route、meta、schema、claims、計測を読み取り監査する | 変更なし/差分ありを証跡付きで返し、Codexが最終確認 |
| `SEO-AIO-056` | ⬜ 未着手 | Fable | 四半期ごとに戦略、優先順位、ページ構造をレビューする | KPIと未完了タスクから計画を読み取り評価する | 続行・停止・優先度変更の助言が残り、Codexが採否を更新 |
| `SEO-AIO-057` | ⬜ 未着手 | Codex | 四半期ごとに企業サイトだけを再監査する | KizunaFinderを除外し、同じURL/質問/指標で再評価する | 前回との差、改善要因、悪化要因、次の3タスクが記録される |

## 7. 提供終了プロダクトの公開停止と関連付け解消

| ID | 状態 | ボール | やること・理由 | 次の一手 | 完了条件・証跡 |
| --- | --- | --- | --- | --- | --- |
| `SEO-AIO-058` | ✅ 完了 | Codex | KizunaFinderの公開LPを、コードと旧デプロイを残したまま終了させる | 410応答を維持する | [KizunaFinder PR #7](https://github.com/toofat2003/kizunafinderLP/pull/7)、merge commit `4cd5f37`、`kizunafinder-lp.ltdhonkoma.com` と `kizunafinder-lp.vercel.app` が410、通常UA/Googlebot/OAI-SearchBot/ChatGPT-UserとPOSTを2026-07-21に確認 |
| `SEO-AIO-059` | ✅ 完了 | Codex | 企業サイトで直接公開されていたKizunaFinder画像を、コード資産を壊さず配信対象外へ移す | 旧URLの410を維持する | [企業サイト PR #55](https://github.com/MaururuTakumi/honkoma-corporate-site/pull/55)、merge commit `16fa951`、Netlify Header/Redirect rules PASS、`ltdhonkoma.com/assets/kizuna/*` が410 + noindex、画像3点は`src/screens/Desktop/assets/kizuna/`へ保持 |
| `SEO-AIO-060` | ⏳ 確認待ち | ユーザー | Google検索結果からKizunaFinderサブドメイン全体を早期に非表示にする | Search Consoleの最終画面で「リクエストを送信」を承認する | `authuser=2` のdomain propertyで `https://kizunafinder-lp.ltdhonkoma.com/` のプレフィックス削除が送信済みになり、申請日時と状態を記録 |
| `SEO-AIO-061` | ⬜ 未着手 | Codex | Bing、外部プロフィール、検索スニペットに残るKizunaFinderとhonkomaの関連付けを減らす | `060` 後、Bing Webmaster Toolsの権限と検索結果を確認する | 削除申請または修正対象URL、申請日、未対応理由が記録される |
| `SEO-AIO-062` | ⏳ 確認待ち | ユーザー | 公開GitHubリポジトリのコードから会社との関連が再学習されるリスクを判断する | repo管理者がprivate化、公開継続、別保管のどれにするか決める | `toofat2003/kizunafinderLP` の公開境界が明文化され、private化する場合は管理者権限で実施。Codexの現権限はpushのみでadmin権限なし |
| `SEO-AIO-063` | ⬜ 未着手 | Codex | 停止後30日・90日に検索とAI回答の残存を定点確認する | `060` と `061` 後、同じ検索語・固定質問で確認日を設定する | `site:`検索、指名質問、会社関連付け、引用URLの残存と変化が日付付きで記録される。学習済みLLM知識の即時消去は保証しない |

## 証跡の書き方

完了にするときは、該当行の末尾またはこの節に次の形式で追記します。

```text
SEO-AIO-010 | 2026-07-xx | owner: Codex
証跡: commit <SHA>, PR <URL>, build PASS, production <URL>, browser確認 <日時>
結果: canonical/robots/sitemapがltdhonkoma.comへ一致
```

証跡がないものは完了にしません。タスクを廃止する場合も削除せず、「取り下げ」と理由を残します。IDは再利用しません。

```text
SEO-AIO-058 | 2026-07-21 | owner: Codex
証跡: PR #7, merge 4cd5f37, Vercel production PASS, public URL 410, browser確認 2026-07-21 17:39 JST
結果: 公開LP、既知の本番Vercel alias、フォーム/API/画像を停止。会社サイトへのredirectは行っていない

SEO-AIO-059 | 2026-07-21 | owner: Codex
証跡: PR #55, merge 16fa951, npm run build PASS, Netlify redirect/header checks PASS, browser確認 2026-07-21 17:51 JST
結果: 企業サイトの旧画像URLを410化し、画像本体は未接続の旧画面コード配下へ保持
```

## 公式の判断基準

- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: canonical URL](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [OpenAI: OAI-SearchBot / GPTBot / ChatGPT-User](https://developers.openai.com/api/docs/bots)
- [OpenAI: ChatGPT Searchへの掲載条件](https://help.openai.com/en/articles/9237897-chatgpt-search)
- [web.dev: Core Web Vitals](https://web.dev/articles/vitals)

## 変更履歴

- 2026-07-21: 初版作成。2026-07-17 GEO監査、repo監査、GitHub Issue、PR #54、Fable設計レビューを統合。KizunaFinderを別プロダクトとして対象外に設定。
- 2026-07-21: Codex Desktopの専用タスクを作成し、サイドバーへピン留め。
- 2026-07-21: KizunaFinder公開LPと企業サイト内の旧画像URLを410化。Google/Bing削除と30/90日後の残存確認を`058`〜`063`へ追加。
- 2026-07-21: [`docs/geo-audit-todo.md`](./geo-audit-todo.md)（GEO監査アクションビュー）を新設し、`SEO-AIO-007`を完了とした。状態・担当・証跡の正本は引き続き本ボード。
