/* =============================================================================
 * RecruitPage (/recruit) — 採用（site-ia-design §4）
 *
 * 「人物像で募る」を軸にしながら、実在する募集ポジションだけ具体的なJDを出す。
 * レンズ=🔥主・👤副（発注者も代表の物語を読む前提で誇張ゼロ・実名実話のみ）。
 *
 * セクション: Hero(旗) → 創業ストーリー(感情→協働→大義) → 行動指針(再掲) →
 *   こんな人を探している(人物像) → 具体募集JD → 応募CTA(カジュアル面談一本化)。
 *
 * 行動指針(#principles)は4原則で確定済み（docs/product-and-principles-design.md
 * §1.1）。本文は /about の原本（#principles）と一字一句同一。改訂時は /about を
 * 先に直し、ここへ同期すること。
 * ========================================================================== */

import { useEffect, useState } from "react";
import { SectionShell } from "../components/Layout/SectionShell";
import { SectionHeading } from "../components/ui/SectionHeading";
import { StaggerGrid } from "../components/ui/StaggerGrid";
import { SurfaceCard } from "../components/ui/SurfaceCard";
import { Reveal } from "../components/motion/Reveal";
import { ArrowCTA } from "../components/ui/ArrowCTA";

/* 創業ストーリー: 感情 → 協働 → 大義 の3段（content分析§6）。実名実話のみ。 */
const STORY: { en: string; title: string; body: string }[] = [
  {
    en: "01 — Ignition",
    title: "挫折から、起業へ。",
    body: "東京大学運動会硬式野球部での挫折。マッキンゼーの内定辞退。安定した“誰かが用意した道”を歩む選択肢はあった。それでも代表・林拓海は、AI最前線の変化の速さに胸を躍らせ、自らの手で未来を立ち上げる道を選んだ。",
  },
  {
    en: "02 — Together",
    title: "10人で、現場に入り込む。",
    body: "honkomaは10名のチーム。正社員・インターン・業務委託が混ざり合い、上場企業からクリニックの現場まで、AIの伴走導入を重ねてきた。ツールを配って終わりにせず、成果が出て社内に残るところまで一緒に作り切る。",
  },
  {
    en: "03 — Cause",
    title: "誰かが作った時代を、生きない。",
    body: "与えられた時代をなぞるのではなく、自分の手でつくる側に回る。honkomaが目指すのは、一人ひとりが「自分事」として時代を立ち上げる世界。その最前線を、一緒に走る仲間を探している。",
  },
];

/* 行動指針(#principles) — /about の原本と本文を完全一致させる（言い換え禁止）。
 * docs/product-and-principles-design.md §1.1 確定コピー。 */
const PRINCIPLES: { en: string; title: string; body: string }[] = [
  {
    en: "Ownership",
    title: "「自分事」",
    body: "クライアントの課題も、チームの課題も、時代の課題も、自分の課題として引き受ける。「誰かがやるだろう」を、honkomaに置かない。",
  },
  {
    en: "Solve First",
    title: "まず、解く。",
    body: "AIは手段で、目的はいつも課題解決。何を使ったかではなく、何が解けたかで、仕事を測ろう。",
  },
  {
    en: "Stay at the Edge",
    title: "最先端に、立ち続ける。",
    body: "誰よりも早く試して、昨日までの正解を疑う。従来のやり方は、参考にしても前提にしない。",
  },
  {
    en: "Today, Not Tomorrow",
    title: "今日、やる。",
    body: "明日に回すほど、はじめの一歩は重くなる。小さくてもいい、今日動かして、今日学ぼう。",
  },
];

/* こんな人を探している: 人物像の名指し（見出し＋一行）。職種一覧は作らない。
 * docs/recruit-redesign-design.md §2.2 確定コピー。 */
const PERSONAS: { title: string; body: string }[] = [
  {
    title: "AIに、心が動く人",
    body: "最新のAIを「仕事の話」としてではなく、「面白い話」として追いかけてしまう。その好奇心が出発点。",
  },
  {
    title: "人と話すのが、好きな人",
    body: "honkomaの仕事は、現場の人との会話から始まる。少し明るい、はそれだけで立派な強み。",
  },
  {
    title: "スキルは、これからでいい人",
    body: "PMも開発も、今できる必要はない。伝える力と学ぶ速さがあれば、道具はAIと私たちが揃える。",
  },
  {
    title: "仕事を、自分事にできる人",
    body: "頼まれた範囲で止まらず、「自分ならどうするか」で考える。行動指針の第1原則、そのまま。",
  },
];

/* かかわり方（インターン〜正社員）。職種一覧＝求人票にはしない（§2.3）。 */
const INVOLVEMENT = ["インターン", "業務委託", "正社員"];

const IMAGE_AI_JOB = {
  responsibilities: [
    "漫画・キャラクター向け学習データの整理、選定、キャプション設計",
    "画像生成モデルをベースとしたLoRAの学習とチューニング",
    "学習率、rank、学習ステップなどの条件比較と実験管理",
    "キャラクター、画風、表情、ポーズの再現性評価",
    "複数コマにおけるキャラクターの一貫性改善",
    "生成ワークフローの構築と漫画制作チームへの共有",
  ],
  requirements: [
    "ベクトル、行列など線形代数の基礎を理解している",
    "Pythonを使った機械学習の実装経験がある",
    "PyTorchなどの機械学習フレームワークに触れたことがある",
    "画像生成モデルの仕組みやチューニングに興味がある",
    "論文や実装を調べながら、自分で実験を進められる",
  ],
  welcome: [
    "Diffusers、ComfyUIなどを使った画像生成経験",
    "LoRA、DreamBoothなどによる追加学習の経験",
    "CUDA環境やクラウドGPUを使った学習経験",
    "学習データの前処理やモデル評価の経験",
    "漫画、アニメ、キャラクター、コンテンツが好き",
  ],
  stack: [
    "Python",
    "PyTorch",
    "Hugging Face Diffusers",
    "Hugging Face Accelerate",
    "ComfyUI",
    "CUDA / Linux",
    "Git / GitHub",
    "Weights & Biases",
  ],
} as const;

const X_DM_URL = "https://x.com/moriyorihayash1";

/* カジュアル面談の主動線 = 単一スワップポイント（§3.2）。
 * Phase 1: null のまま → /contact?type=recruit（種別プリセット・実装済）。
 * Phase 2: Googleカレンダー予約URLを入れると、全CTAが自動で予約(新規タブ)へ昇格する。 */
const RECRUIT_BOOKING_URL: string | null =
  "https://calendar.app.google/EqoJxNZ8i2NheCmM8";

/** まず話す動線のCTA。RECRUIT_BOOKING_URL の有無でPhase1/2を自動切替。 */
function CasualTalkCTA({
  size,
  variant,
  withText,
}: {
  size?: "lg";
  variant: "fill" | "outline" | "ghost";
  withText: string;
}) {
  if (RECRUIT_BOOKING_URL) {
    return (
      <ArrowCTA
        href={RECRUIT_BOOKING_URL}
        direction="external"
        size={size}
        variant={variant}
        withText={withText}
        label={withText}
      />
    );
  }
  return (
    <ArrowCTA
      to="/contact?type=recruit"
      size={size}
      variant={variant}
      withText={withText}
      label={withText}
    />
  );
}

/* ヒーロー主見出しは対句2行が基本。ただし狭い画面では各行が2段に割れて不格好
 * になるため、意味の単位で4分割へ落とす（recruit-redesign §1.2）。 */
const HERO_TITLE_WIDE = [
  "スキルの差は、AIが埋める。",
  "熱意の差は、埋まらない。",
];
const HERO_TITLE_NARROW = [
  "スキルの差は、",
  "AIが埋める。",
  "熱意の差は、",
  "埋まらない。",
];

const RecruitPage = () => {
  const [heroTitle, setHeroTitle] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 820px)").matches
      ? HERO_TITLE_NARROW
      : HERO_TITLE_WIDE,
  );

  useEffect(() => {
    document.title = "採用情報 | honkoma";
    const mq = window.matchMedia("(max-width: 820px)");
    const pick = () =>
      setHeroTitle(mq.matches ? HERO_TITLE_NARROW : HERO_TITLE_WIDE);
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  return (
    <div style={{ background: "var(--surface-base)" }}>
      {/* ===== HERO — 旗 ===== */}
      <SectionShell>
        {/* ヒーロー見出しは1文=1行で見せたい。--fs-hero(最大5.5rem)だと1行目
         * 「スキルの差は、AIが埋める。」がコンテナ幅を超えて語中で割れるため、
         * このヒーロー限定で最大値を抑える(820px以下は短い4行版に切替済み)。 */}
        <style>{`
          .recruit-hero-heading h1 {
            font-size: clamp(2.1rem, 5vw, 4.4rem);
            word-break: keep-all;
          }
          .recruit-job-heading h2 {
            font-size: clamp(2rem, 5vw, 4rem);
            word-break: keep-all;
          }
          .recruit-job-section > div:last-child {
            padding-bottom: clamp(3.5rem, 7vh, 6rem);
          }
          .recruit-final-cta > div:last-child {
            padding-top: clamp(3.5rem, 7vh, 6rem);
          }
        `}</style>
        <SectionHeading
          className="recruit-hero-heading"
          enLabel="Skills converge. Passion doesn't."
          title={heroTitle}
          level={1}
        />
        <Reveal variant="fade">
          <p
            style={{
              maxWidth: "46ch",
              margin: "1.75rem 0 clamp(2rem, 4vw, 3rem)",
              color: "var(--text-secondary)",
              fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
              lineHeight: 2,
            }}
          >
            AIが誰の手にも届いた今、「何ができるか」の差は日ごとに縮んでいく。
            最後に差になるのは、目の前の課題をどこまで自分事にできるか——つまり熱意だ。
            honkomaは、その熱を持つ仲間を探している10人のチーム。
          </p>
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <CasualTalkCTA
              size="lg"
              variant="fill"
              withText="まず話す（カジュアル面談）"
            />
            <ArrowCTA
              to="/team"
              variant="outline"
              withText="メンバーを見る"
              label="メンバーを見る"
            />
          </div>
        </Reveal>
      </SectionShell>

      {/* ===== 創業ストーリー（感情→協働→大義） — inverse ===== */}
      <SectionShell theme="inverse" wedge="top">
        <SectionHeading
          enLabel="Our Story"
          title="人で語る、honkomaの原点。"
          level={2}
        />
        <div style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <StaggerGrid columns={{ base: 1, md: 3 }} gap="md">
            {STORY.map((s) => (
              <div key={s.en}>
                <span
                  className="font-en"
                  style={{
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  {s.en}
                </span>
                <h3
                  style={{
                    fontSize: "var(--fs-h3)",
                    fontWeight: 700,
                    margin: "0.75rem 0 0.9rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.95,
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </SectionShell>

      {/* ===== 行動指針（再掲） — 本文は /about#principles の原本と完全一致 ===== */}
      <SectionShell id="principles" wedge="top">
        <SectionHeading
          enLabel="Our Principles"
          title="honkomaの、行動指針。"
          level={2}
        />
        <div style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <StaggerGrid columns={{ base: 1, md: 2 }} gap="md">
            {PRINCIPLES.map((p, i) => (
              <SurfaceCard key={p.en}>
                <span
                  className="font-en"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-accent)",
                    fontWeight: 700,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} / 04
                </span>
                <div
                  className="font-en"
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                  }}
                >
                  {p.en}
                </div>
                <h3
                  style={{
                    fontSize: "var(--fs-h3)",
                    fontWeight: 700,
                    margin: "0.75rem 0 0.75rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.95rem",
                    lineHeight: 1.85,
                  }}
                >
                  {p.body}
                </p>
              </SurfaceCard>
            ))}
          </StaggerGrid>
        </div>
        <div style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
          <ArrowCTA
            to="/about#principles"
            variant="outline"
            withText="行動指針の原本へ"
            label="行動指針の原本へ"
          />
        </div>
      </SectionShell>

      {/* ===== こんな人を探している（人物像） ===== */}
      <SectionShell wedge="top">
        <SectionHeading
          enLabel="Who We Look For"
          title="職種ではなく、人で募る。"
          level={2}
        />
        <Reveal variant="fade">
          <p
            style={{
              maxWidth: "44ch",
              margin: "1.5rem 0 clamp(2.5rem, 5vw, 4rem)",
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              lineHeight: 1.9,
            }}
          >
            肩書きや経歴よりも、まず大切にしている4つのことがあります。
            ひとつでも「自分のことだ」と思えたら、まず話しましょう。
          </p>
        </Reveal>
        <StaggerGrid columns={{ base: 1, md: 2 }} gap="md">
          {PERSONAS.map((p, i) => (
            <div
              key={p.title}
              style={{
                padding: "1.6rem 0",
                borderTop:
                  "1px solid color-mix(in srgb, var(--text-primary) 10%, transparent)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}
              >
                <span
                  className="font-en"
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-accent)",
                    fontWeight: 700,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    lineHeight: 1.5,
                  }}
                >
                  {p.title}
                </span>
              </div>
              <p
                style={{
                  margin: "0.6rem 0 0",
                  paddingLeft: "calc(0.85rem + 1rem)",
                  color: "var(--text-secondary)",
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                }}
              >
                {p.body}
              </p>
            </div>
          ))}
        </StaggerGrid>

        {/* 中間CTA — 人物像直後、離脱前の最も温度が高い位置（§2.4） */}
        <Reveal variant="fadeUp">
          <div style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            <p
              style={{
                margin: "0 0 1.25rem",
                color: "var(--text-primary)",
                fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
                fontWeight: 600,
                lineHeight: 1.7,
              }}
            >
              ひとつでも心が動いたら、30分だけ話しましょう。
            </p>
            <CasualTalkCTA variant="fill" withText="カジュアル面談へ" />
          </div>
        </Reveal>

        {/* かかわり方ストリップ — 求人票にしない（§2.3・カード3枚に分けない） */}
        <div style={{ marginTop: "clamp(3rem, 6vw, 4.5rem)" }}>
          <Reveal variant="fadeUp">
            <div
              style={{
                background: "var(--surface-raised)",
                borderRadius: "var(--radius-lg)",
                padding: "clamp(1.75rem, 3.5vw, 2.5rem)",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--fs-h3)",
                  fontWeight: 700,
                  margin: "0 0 0.75rem",
                  color: "var(--text-primary)",
                }}
              >
                かかわり方は、話しながら決める。
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.98rem",
                  lineHeight: 1.9,
                  maxWidth: "48ch",
                }}
              >
                インターン、業務委託、正社員——入り口はどこからでも。
                今のあなたに合うかかわり方を、面談で一緒に見つけるところから始めます。
              </p>
              <div
                className="font-en"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem 1.5rem",
                  marginTop: "1.5rem",
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-accent)",
                  fontWeight: 700,
                }}
              >
                {INVOLVEMENT.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </SectionShell>

      {/* ===== 具体募集 — 画像生成AIエンジニア（インターン） ===== */}
      <SectionShell
        id="open-position"
        className="recruit-job-section"
        theme="inverse"
        wedge="top"
      >
        <SectionHeading
          className="recruit-job-heading"
          enLabel="Job Description / Open Position 01"
          title={["画像生成AIエンジニア", "インターン"]}
          level={2}
        />

        <Reveal variant="fade">
          <div
            style={{
              maxWidth: "62ch",
              margin: "1.75rem 0 clamp(3rem, 6vw, 5rem)",
            }}
          >
            <p
              className="font-en"
              style={{
                margin: "0 0 1rem",
                color: "var(--color-accent-bright)",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Generative AI Engineer Intern — Manga &amp; Character Models
            </p>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                fontSize: "clamp(1rem, 1.35vw, 1.18rem)",
                lineHeight: 2,
              }}
            >
              漫画IP制作に活用する画像生成モデルを、制作現場で使える品質へ育てるポジションです。
              キャラクターや画風の再現性を高めるLoRAの作成を中心に、学習データの設計、
              モデルのチューニング、生成結果の評価、制作ワークフローへの組み込みまで担当します。
              単に画像を生成するだけでなく、同じキャラクターを異なる表情・ポーズ・構図でも
              安定して表現できる状態をつくり、実際の漫画制作へつなげることがゴールです。
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          {[
            ["What you'll do", "主な業務", IMAGE_AI_JOB.responsibilities],
            ["Requirements", "必須要件", IMAGE_AI_JOB.requirements],
            ["Nice to have", "歓迎要件", IMAGE_AI_JOB.welcome],
          ].map(([en, title, items]) => (
            <Reveal key={title as string} variant="fadeUp">
              <div
                style={{
                  height: "100%",
                  paddingTop: "1.4rem",
                  borderTop:
                    "1px solid color-mix(in srgb, var(--text-primary) 16%, transparent)",
                }}
              >
                <span
                  className="font-en"
                  style={{
                    color: "var(--color-accent-bright)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {en}
                </span>
                <h3
                  style={{
                    margin: "0.55rem 0 1.2rem",
                    color: "var(--text-primary)",
                    fontSize: "var(--fs-h3)",
                    fontWeight: 700,
                  }}
                >
                  {title}
                </h3>
                <ul
                  style={{
                    display: "grid",
                    gap: "0.8rem",
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                  }}
                >
                  {(items as readonly string[]).map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "0.7rem 1fr",
                        gap: "0.75rem",
                        color: "var(--text-secondary)",
                        fontSize: "0.94rem",
                        lineHeight: 1.8,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ color: "var(--color-accent-bright)" }}
                      >
                        /
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fadeUp">
          <div
            style={{
              marginTop: "clamp(3rem, 6vw, 5rem)",
              padding: "clamp(1.75rem, 4vw, 3rem)",
              background: "var(--surface-raised)",
              borderRadius: "var(--radius-lg)",
            }}
          >
            <span
              className="font-en"
              style={{
                color: "var(--color-accent-bright)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Technology
            </span>
            <h3
              style={{
                margin: "0.55rem 0 1.3rem",
                color: "var(--text-primary)",
                fontSize: "var(--fs-h3)",
                fontWeight: 700,
              }}
            >
              想定技術スタック
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
              {IMAGE_AI_JOB.stack.map((item) => (
                <span
                  key={item}
                  className="font-en"
                  style={{
                    padding: "0.55rem 0.8rem",
                    border:
                      "1px solid color-mix(in srgb, var(--text-primary) 18%, transparent)",
                    borderRadius: "var(--radius-pill)",
                    color: "var(--text-secondary)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal variant="fadeUp">
          <div style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
            <span
              className="font-en"
              style={{
                color: "var(--color-accent-bright)",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Conditions
            </span>
            <h3
              style={{
                margin: "0.55rem 0 1.5rem",
                color: "var(--text-primary)",
                fontSize: "var(--fs-h3)",
                fontWeight: 700,
              }}
            >
              募集条件
            </h3>
            <dl style={{ margin: 0 }}>
              {[
                [
                  "勤務地・働き方",
                  "東京都品川区小山5-25-7。リモートワーク可。業務内容やプロジェクトの状況に応じて、出社とリモートを組み合わせて働けます。",
                ],
                [
                  "稼働",
                  "週3日程度から応相談。アウトプットを重視しているため、フルタイムでのコミットは必須ではありません。学業や他の活動との両立も可能です。",
                ],
                [
                  "報酬",
                  "時給2,500〜6,000円を目安に、経験・スキル・担当範囲・コミットメントに応じて個別に決定します。",
                ],
                [
                  "GPU環境",
                  "学習・検証に必要な環境は会社で用意します。RTX 6000 Pro搭載マシン1台を保有し、クラウドGPUを2台契約しています。",
                ],
              ].map(([term, detail]) => (
                <div
                  key={term}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
                    gap: "1.25rem",
                    padding: "1.35rem 0",
                    borderTop:
                      "1px solid color-mix(in srgb, var(--text-primary) 16%, transparent)",
                  }}
                >
                  <dt style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                    {term}
                  </dt>
                  <dd
                    style={{
                      margin: 0,
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                      lineHeight: 1.85,
                    }}
                  >
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal variant="fadeUp">
          <div style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
            <p
              style={{
                margin: "0 0 1.25rem",
                color: "var(--text-primary)",
                fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
                fontWeight: 600,
                lineHeight: 1.7,
              }}
            >
              すべてに当てはまらなくても大丈夫です。少しでも興味があれば、まず話しましょう。
            </p>
            <CasualTalkCTA
              size="lg"
              variant="fill"
              withText="このポジションについて話す"
            />
          </div>
        </Reveal>
      </SectionShell>

      {/* ===== 応募CTA（カジュアル面談一本化） — inverse ===== */}
      <SectionShell
        className="recruit-final-cta"
        theme="inverse"
        wedge="top"
        width="content"
      >
        <div style={{ maxWidth: 760 }}>
          <SectionHeading
            enLabel="Let's talk"
            title={["まずは、", "話すことから。"]}
            level={2}
          />
          <Reveal variant="fadeUp">
            <p
              style={{
                margin: "1.5rem 0 1.25rem",
                color: "var(--text-secondary)",
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                lineHeight: 1.9,
                maxWidth: "44ch",
              }}
            >
              履歴書も、志望動機も、準備もいらない。
              30分、オンラインで雑談するところから始めましょう。
              これは選考ではないので、身構えなくて大丈夫。
            </p>
            <div
              className="font-en"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem 1.5rem",
                margin: "0 0 clamp(2rem, 4vw, 3rem)",
                fontSize: "0.85rem",
                letterSpacing: "0.06em",
                color: "var(--color-accent-bright)",
                fontWeight: 700,
              }}
            >
              <span>オンライン30分</span>
              <span>選考ではありません</span>
              <span>準備するものなし</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <CasualTalkCTA
                size="lg"
                variant="fill"
                withText="カジュアル面談を申し込む"
              />
              <ArrowCTA
                href={X_DM_URL}
                variant="ghost"
                direction="external"
                withText="代表にXでDM"
                label="代表にXでDM"
              />
            </div>
          </Reveal>
        </div>
      </SectionShell>
    </div>
  );
};

export default RecruitPage;
