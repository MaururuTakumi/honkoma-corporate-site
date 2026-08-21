import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, m, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Reveal, RevealGroup } from "../components/motion/Reveal";
import { dur, ease, stagger } from "../design/tokens";
import { useReducedMotionSafe } from "../motion/variants";
import "./MangaIpPage.css";

const businessAreas = [
  {
    en: "ORIGINAL IP",
    ja: "オリジナルIP",
    image: "/assets/manga-ip/original-ip.jpg",
    alt: "漫画の企画書やネーム、作画道具が並ぶ制作机",
    description:
      "私たちの原点。企画の発掘から制作、編集、配信まで、オリジナル作品を一貫して生み出します。",
    tags: ["企画開発", "編集・制作", "連載・配信"],
  },
  {
    en: "CREATOR PARTNERSHIP",
    ja: "クリエイターパートナーシップ",
    image: "/assets/manga-ip/creator-partnership.jpg",
    alt: "漫画原稿を囲んで話すクリエイターと編集者",
    description:
      "クリエイターが生み出した小説やシナリオの世界観を守り、確認や連絡の負担を抑えながら、スピーディーに漫画化します。",
    tags: ["相談・提案", "制作サポート", "共同開発"],
  },
  {
    en: "IP GROWTH",
    ja: "IPの成長支援",
    image: "/assets/manga-ip/ip-growth.jpg",
    alt: "漫画が映像や海外へ展開していく様子を描いた制作スタジオ",
    description:
      "映像化、海外展開、グッズ、ゲームなど、多様なメディアで物語の可能性とIPの価値を広げます。",
    tags: ["映像・アニメ化", "海外展開", "ライセンス・商品化"],
  },
] as const;

const journeySteps = [
  {
    label: "企画する",
    description: "小さなアイデアから、世界をつくる。市場や読者の声も丁寧に読み解きます。",
  },
  {
    label: "つくる",
    description: "編集と作家が対話を重ね、心を動かす物語を形にします。",
  },
  {
    label: "届ける",
    description: "最適なプラットフォームで発表し、読者との出会いを生み出します。",
  },
  {
    label: "育てる",
    description: "映像化や海外展開など、物語の可能性を広げ続けます。",
  },
] as const;

const navItems = [
  { label: "私たちの思想", href: "#vision" },
  { label: "事業について", href: "#business" },
  { label: "パートナーシップ", href: "#creators" },
  { label: "採用情報", to: "/recruit" },
  { label: "会社情報", to: "/about" },
  { label: "お問い合わせ", to: "/contact" },
] as const;

type MangaButtonProps = {
  children: string;
  to?: string;
  href?: string;
  tone?: "blue" | "ink" | "outline";
  onClick?: () => void;
};

function MangaButton({
  children,
  to,
  href,
  tone = "blue",
  onClick,
}: MangaButtonProps) {
  const className = `mip-button mip-button--${tone}`;
  const content = (
    <>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" />
    </>
  );

  if (to) {
    return (
      <Link className={className} to={to} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <a className={className} href={href} onClick={onClick}>
      {content}
    </a>
  );
}

function MangaIpHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="mip-header">
      <div className="mip-header__inner">
        <Link className="mip-logo mip-logo--image" to="/" aria-label="honkoma ホーム">
          <img
            src="/assets/hotel/honkoma-logo-blue.png"
            alt="honkoma"
            width="220"
            height="109"
          />
        </Link>
        <nav className="mip-nav" aria-label="漫画IP事業ページ">
          {navItems.map((item) =>
            "to" in item ? (
              <Link key={item.label} to={item.to}>
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </nav>
        <button
          type="button"
          className="mip-menu-button"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            className="mip-mobile-nav"
            aria-label="漫画IP事業ページ モバイル"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            {navItems.map((item) =>
              "to" in item ? (
                <Link key={item.label} to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : (
                <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                  <ArrowRight aria-hidden="true" />
                </a>
              ),
            )}
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default function MangaIpPage() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroArtY = useTransform(scrollYProgress, [0, 1], [0, 52]);

  useEffect(() => {
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = reducedMotion ? "auto" : "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, [reducedMotion]);

  const motionStyle = {
    "--mip-dur-fast": `${dur.fast}s`,
    "--mip-dur-base": `${dur.base}s`,
    "--mip-dur-reveal": `${dur.reveal}s`,
    "--mip-ease": `cubic-bezier(${ease.soft.join(",")})`,
    "--mip-ease-out": `cubic-bezier(${ease.out.join(",")})`,
  } as CSSProperties;

  return (
    <div id="top" className="manga-ip-page" style={motionStyle}>
      <Helmet>
        <title>漫画IP事業 | honkoma Manga IP Studio</title>
        <meta
          name="description"
          content="honkomaは、漫画から始まるIPを企画・制作し、クリエイターとともに届け、育てるManga IP Studioです。"
        />
        <link rel="canonical" href="https://ltdhonkoma.com/manga-ip" />
        <meta property="og:title" content="漫画IP事業 | honkoma Manga IP Studio" />
        <meta
          property="og:description"
          content="物語を、育つIPへ。漫画の企画・制作から、クリエイター伴走、IP展開まで。"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <MangaIpHeader />

      <main>
        <section ref={heroRef} id="vision" className="mip-hero" aria-labelledby="mip-hero-title">
          <div className="mip-hero__inner">
            <m.div
              className="mip-hero__copy"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur.hero, ease: ease.out }}
            >
              <h1 id="mip-hero-title">
                <span>物語を、</span>
                <span>育つIPへ。</span>
              </h1>
              <img
                className="mip-title-brush mip-title-brush--hero"
                src="/assets/manga-ip/section-title-brush.png"
                alt=""
                width="1536"
                height="220"
                aria-hidden="true"
              />
              <p className="mip-hero__lead">
                恋も、青春も、日常も。
                <br />
                まだ名前のない感情まで。
                <br />
                honkomaは、漫画から始まるIPをつくり、届け、育てます。
              </p>
              <div className="mip-actions">
                <MangaButton href="#business">事業について</MangaButton>
                <MangaButton href="#creators" tone="outline">
                  クリエイターの方へ
                </MangaButton>
              </div>
            </m.div>

            <m.div
              className="mip-hero__art"
              initial={{ opacity: 0, x: reducedMotion ? 0 : 44 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: dur.hero, ease: ease.out, delay: stagger.base }}
              style={reducedMotion ? undefined : { y: heroArtY }}
              aria-hidden="true"
            >
              <img
                src="/assets/manga-ip/hero-collage.jpg"
                alt=""
                width="1477"
                height="1065"
                loading="eager"
              />
            </m.div>
          </div>
        </section>

        <section id="business" className="mip-business" aria-labelledby="mip-business-title">
          <div className="mip-section-shell">
            <div className="mip-heading-row">
              <div className="mip-heading-with-brush">
                <h2 id="mip-business-title">漫画をつくる。その先までやる。</h2>
                <img
                  className="mip-title-brush mip-title-brush--section"
                  src="/assets/manga-ip/section-title-brush.png"
                  alt=""
                  width="1536"
                  height="220"
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>
              <Reveal variant="fade">
                <p>
                  企画・制作から届くまで。
                  <br />
                  IPの可能性を広げる、統合的な事業を行っています。
                </p>
              </Reveal>
            </div>

            <RevealGroup className="mip-business-grid" stagger={stagger.base}>
              {businessAreas.map((area) => (
                <Reveal key={area.en} as="article" className="mip-business-card">
                  <div className="mip-business-card__heading">
                    <p>{area.en}</p>
                    <h3>{area.ja}</h3>
                  </div>
                  <div className="mip-business-card__image">
                    <img
                      src={area.image}
                      alt={area.alt}
                      width="1536"
                      height="1024"
                      loading="lazy"
                    />
                  </div>
                  <p className="mip-business-card__description">{area.description}</p>
                  <ul className="mip-tags" aria-label={`${area.ja}の対応領域`}>
                    {area.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section className="mip-journey" aria-labelledby="mip-journey-title">
          <div className="mip-section-shell">
            <div className="mip-heading-row mip-heading-row--journey">
              <div>
                <p className="mip-section-label">MANGA JOURNEY</p>
                <h2 id="mip-journey-title">
                  物語が生まれ、
                  <br />
                  未来へ広がるまで。
                </h2>
              </div>
              <Reveal variant="fade">
                <p>
                  作家と編集が同じ方向を見て、
                  <br />
                  ひとつの物語を次の景色へ運びます。
                </p>
              </Reveal>
            </div>

            <div className="mip-journey-scroll" tabIndex={0} aria-label="漫画IPが育つ4つの段階">
              <div className="mip-journey-track">
                <RevealGroup className="mip-journey-labels" stagger={stagger.tight}>
                  {journeySteps.map((step, index) => (
                    <Reveal key={step.label} className={`mip-journey-label mip-journey-label--${index + 1}`}>
                      {step.label}
                    </Reveal>
                  ))}
                </RevealGroup>
                <Reveal variant="scaleIn" className="mip-journey-image">
                  <img
                    src="/assets/manga-ip/manga-journey.jpg"
                    alt="企画、漫画制作、読者への配信、映像や海外への展開をひと続きに描いた漫画"
                    width="2048"
                    height="683"
                    loading="lazy"
                  />
                </Reveal>
                <div className="mip-journey-copy">
                  {journeySteps.map((step) => (
                    <p key={step.label}>{step.description}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="creators" className="mip-creators" aria-labelledby="mip-creators-title">
          <div className="mip-creators__inner">
            <Reveal className="mip-creators__copy">
              <p className="mip-section-label">FOR CREATORS</p>
              <h2 id="mip-creators-title">
                あなたの物語を、
                <br />
                ひとりにしない。
              </h2>
              <p>
                honkomaは、クリエイターが生み出した小説やシナリオの世界観を大切にします。
                確認の負担を抑えながら、制作・発表、その先の展開まで。
                あなたの物語を、スピーディーに漫画へつなげます。
              </p>
              <MangaButton to="/contact" tone="outline">
                クリエイターの方へ
              </MangaButton>
            </Reveal>
            <Reveal variant="scaleIn" className="mip-creators__art">
              <img
                src="/assets/manga-ip/creator-invitation.jpg"
                alt="漫画原稿を前に、クリエイターの話を聞く編集者"
                width="1792"
                height="1024"
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>

        <section className="mip-final" aria-labelledby="mip-final-title">
          <div className="mip-final__inner">
            <Reveal className="mip-final__copy">
              <p className="mip-section-label">NEXT STORY</p>
              <h2 id="mip-final-title">
                物語の、
                <br />
                <span>次の一歩を。</span>
              </h2>
              <p>
                あなたの物語が、世界を動かす。
                <br />
                その一歩を、honkomaと一緒に。
              </p>
              <div className="mip-actions">
                <MangaButton href="#business">事業について</MangaButton>
                <MangaButton to="/contact" tone="outline">
                  お問い合わせ
                </MangaButton>
              </div>
            </Reveal>
            <Reveal variant="fade" className="mip-final__art">
              <img
                src="/assets/manga-ip/final-ensemble.jpg"
                alt="真壁凪を中心に、さまざまな物語を想起させるキャラクターが並ぶ"
                width="1983"
                height="793"
                loading="lazy"
              />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="mip-footer">
        <div className="mip-footer__main">
          <a className="mip-logo" href="#top" aria-label="ページ上部へ">
            honkoma
          </a>
          <nav aria-label="漫画IP事業ページ フッター">
            <a href="#top">私たちの思想</a>
            <a href="#business">事業について</a>
            <a href="#creators">パートナーシップ</a>
            <Link to="/recruit">採用情報</Link>
            <Link to="/about">会社情報</Link>
            <Link to="/contact">お問い合わせ</Link>
          </nav>
        </div>
        <div className="mip-footer__bottom">
          <p>© {new Date().getFullYear()} honkoma Inc. All Rights Reserved.</p>
          <div>
            <Link to="/privacy">プライバシーポリシー</Link>
            <a href="https://x.com/moriyorihayash1" target="_blank" rel="noreferrer">
              X
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
