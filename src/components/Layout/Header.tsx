/* =============================================================================
 * honkoma Design System — Header (LayerX-caliber global nav) — [fable-craft]
 *
 * Rebuilt against docs/lp-redesign-brief.md §3/§7-5 and
 * docs/component-animation-blueprint.md C-1 (FloatingNav, scoped-down).
 *
 * LayerX diffs closed here:
 *  - White surface (surface-raised + blur) instead of cream.
 *  - サービス▾はAI開発事業とIP関連事業の2本を案内する。
 *  - Dual pill CTAs on the right (LayerX [Join Us][採用情報] slot):
 *    [導入事例 outline] + [ご相談はこちら fill].
 *  - Refined hovers: nav links grow a hairline underline from the left and
 *    collapse it to the right (transform-origin swap); pills sweep their fill
 *    up from the bottom — same family as ArrowCTA's sweep.
 *  - Scroll morph (§7-5): past `vh * scroll.navMorphY` (±80px hysteresis) the
 *    full bar exits upward and a floating "Menu" pill (top-left) + back-to-top
 *    ArrowCTA (top-right) enter. The Menu pill and the mobile hamburger share
 *    one full-screen overlay (focus trap, Esc, scroll lock, route-close).
 *
 * Constraints honored: sticky preserved, semantic CSS vars only (new hknav-*
 * namespace; legacy cream/ink tokens untouched), m.* via app-root LazyMotion,
 * all duration/easing from design/tokens.ts (no literals), reduced-motion via
 * MotionConfig + CSS fallback, keyboard/aria parity for every hover.
 * ========================================================================== */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { dur, ease, stagger, dist, scroll } from "../../design/tokens";
import ArrowCTA from "../ui/ArrowCTA";
import { useAiChat } from "../../features/ai-chat/ChatProvider";

/* ------------------------------------------------------------------ data --- */

type NavChild = { label: string; to: string };
type NavItem = { label: string; to: string; children?: NavChild[] };

/* site-ia-design §1.2: 4 top items. "ホーム" is carried by the logo.
 * 私たちについて▾ bundles the company set (原則3); サービス▾はAI開発事業と
 * 独立LPとして運用するIP関連事業を束ねる。 */
const NAV: NavItem[] = [
  {
    label: "私たちについて",
    to: "/about",
    children: [
      { label: "ミッション・行動指針", to: "/about" },
      { label: "会社概要", to: "/about#profile" },
      { label: "メンバー", to: "/team" },
    ],
  },
  {
    label: "サービス",
    to: "/product",
    children: [
      { label: "AI開発事業", to: "/product" },
      { label: "IP関連事業", to: "/manga-ip" },
    ],
  },
  { label: "導入事例", to: "/case-studies" },
  { label: "採用情報", to: "/recruit" },
];

/** Overlay lists every destination flat (mobile users get no dropdown). */
const OVERLAY_LINKS: { label: string; en: string; to: string }[] = [
  { label: "ホーム", en: "Home", to: "/" },
  { label: "私たちについて", en: "About", to: "/about" },
  { label: "メンバー", en: "Members", to: "/team" },
  { label: "AI開発事業", en: "AI Development", to: "/product" },
  { label: "IP関連事業", en: "IP Business", to: "/manga-ip" },
  { label: "導入事例", en: "Case Studies", to: "/case-studies" },
  { label: "採用情報", en: "Careers", to: "/recruit" },
];

/* CTA階層(§0-1): outlineピル=商談リード用のAIチャット起動(source=header・
 * 起動点F)。fillピル=「もう決めた人」の最短経路=/contact。採用はピルに置かず
 * ナビ一等地に譲る（営業装置としての最短経路を殺さないため）。 */
const CTA_AI_LABEL = "AIに聞いてみる";
const CTA_PRIMARY = { label: "ご相談はこちら", to: "/contact" };

/* ------------------------------------------------------- scroll morph hook --- */

/** Hysteresis deadband (px, a distance — time/easing stay in tokens.ts). */
const MORPH_DEADBAND_PX = 80;

/** Dropdown panel entrance offset (px, distance). */
const PANEL_OFFSET_Y = 8;

type NavPhase = "full" | "condensed";

/**
 * 'full' near the top, 'condensed' past vh * scroll.navMorphY. The ±deadband
 * keeps the boundary from flickering when the user hovers around it (C-1 AC①).
 */
function useNavPhase(): NavPhase {
  const [phase, setPhase] = React.useState<NavPhase>("full");

  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight,
      );
      const threshold = vh * scroll.navMorphY;
      const y = window.scrollY;
      setPhase((prev) =>
        prev === "full"
          ? y > threshold + MORPH_DEADBAND_PX
            ? "condensed"
            : "full"
          : y < threshold - MORPH_DEADBAND_PX
            ? "full"
            : "condensed",
      );
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    /* capture=true also catches scrolls that don't bubble (robustness). */
    document.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return phase;
}

/* -------------------------------------------------------------- stylesheet --- */
/* Injected once (ArrowCTA pattern) so dur/ease literals never leak into CSS. */

const NAV_STYLE = `
.hknav-scope {
  --hk-dur-fast: ${dur.fast}s;
  --hk-dur-base: ${dur.base}s;
  --hk-dur-instant: ${dur.instant}s;
  --hk-ease: cubic-bezier(${ease.soft.join(",")});
  --hk-ease-out: cubic-bezier(${ease.out.join(",")});
  --hk-border: color-mix(in srgb, var(--text-primary) 10%, transparent);
  --hk-link-px: 0.875rem;
}

/* --- bar morph (§7-5): CSS-driven exit so sticky + transform stay reliable --- */
.hknav-head {
  transition:
    transform var(--hk-dur-base) var(--hk-ease-out),
    visibility 0s linear 0s;
  will-change: transform;
}
.hknav-head--condensed {
  transform: translateY(-110%);
  visibility: hidden; /* drops hidden bar links from the tab order */
  transition:
    transform var(--hk-dur-base) var(--hk-ease-out),
    visibility 0s linear var(--hk-dur-base);
}

/* --- bar ------------------------------------------------------------------ */
.hknav-bar {
  background: color-mix(in srgb, var(--surface-raised) 88%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--hk-border);
}

/* --- nav link: hairline underline, in from left / out to the right --------- */
.hknav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem var(--hk-link-px);
  border-radius: var(--radius-sm);
  font-family: var(--font-jp);
  font-size: var(--fs-label);
  letter-spacing: 0.02em;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color var(--hk-dur-fast) var(--hk-ease);
}
.hknav-link::after {
  content: "";
  position: absolute;
  left: var(--hk-link-px);
  right: var(--hk-link-px);
  bottom: 0.15rem;
  height: 1.5px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: right center; /* collapse exits to the right */
  transition: transform var(--hk-dur-fast) var(--hk-ease);
}
@media (hover: hover) {
  .hknav-link:hover { color: var(--text-primary); }
  .hknav-link:hover::after {
    transform: scaleX(1);
    transform-origin: left center; /* growth enters from the left */
  }
}
.hknav-link:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--surface-raised), 0 0 0 4px var(--focus-ring);
  color: var(--text-primary);
}
.hknav-link:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left center;
}
.hknav-link--active { color: var(--text-primary); font-weight: 500; }
.hknav-link--active::after { transform: scaleX(1); }

.hknav-chevron {
  width: 0.75rem;
  height: 0.75rem;
  transition: transform var(--hk-dur-fast) var(--hk-ease);
}
.hknav-chevron--open { transform: rotate(180deg); }

/* --- dropdown panel --------------------------------------------------------- */
.hknav-ddwrap {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 0.5rem; /* pointer bridge: no hover gap between link and panel */
  z-index: 10;
}
.hknav-ddpanel {
  min-width: 240px;
  padding: 0.5rem;
  background: var(--surface-raised);
  border: 1px solid var(--hk-border);
  border-radius: var(--radius-md);
  box-shadow: 0 16px 40px -16px color-mix(in srgb, var(--text-primary) 28%, transparent);
}
.hknav-ddlink {
  display: block;
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: var(--fs-label);
  letter-spacing: 0.02em;
  color: var(--text-secondary);
  text-decoration: none;
  transition:
    color var(--hk-dur-fast) var(--hk-ease),
    background-color var(--hk-dur-fast) var(--hk-ease);
}
@media (hover: hover) {
  .hknav-ddlink:hover {
    color: var(--color-accent);
    background: var(--color-accent-soft);
  }
}
.hknav-ddlink:focus-visible {
  outline: none;
  color: var(--color-accent);
  background: var(--color-accent-soft);
  box-shadow: 0 0 0 2px var(--focus-ring);
}
.hknav-ddlink--active { color: var(--color-accent); font-weight: 500; }

/* --- pill CTAs: fill sweeps up from the bottom ------------------------------ */
.hknav-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.4rem;
  border-radius: var(--radius-pill);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  cursor: pointer;
  transition:
    color var(--hk-dur-fast) var(--hk-ease),
    border-color var(--hk-dur-fast) var(--hk-ease),
    transform var(--hk-dur-instant) var(--hk-ease);
}
.hknav-pill > span { position: relative; z-index: 1; }
.hknav-pill::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  transform: translateY(101%);
  transition: transform var(--hk-dur-fast) var(--hk-ease);
  z-index: 0;
}
.hknav-pill--fill {
  background: var(--color-accent);
  border: 1px solid var(--color-accent);
  color: var(--text-on-inverse);
}
.hknav-pill--fill::before { background: var(--surface-inverse); }
.hknav-pill--outline {
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--text-primary) 22%, transparent);
  color: var(--text-primary);
}
.hknav-pill--outline::before { background: var(--color-accent); }
@media (hover: hover) {
  .hknav-pill:hover::before { transform: translateY(0); }
  .hknav-pill--outline:hover {
    color: var(--text-on-inverse);
    border-color: var(--color-accent);
  }
}
.hknav-pill:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--surface-raised), 0 0 0 4px var(--focus-ring);
}
.hknav-pill:focus-visible::before { transform: translateY(0); }
.hknav-pill--outline:focus-visible {
  color: var(--text-on-inverse);
  border-color: var(--color-accent);
}
.hknav-pill:active { transform: scale(0.97); }

/* --- floating "Menu" pill (condensed phase) --------------------------------- */
.hknav-menupill {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 1.5rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--hk-border);
  background: color-mix(in srgb, var(--surface-raised) 90%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 24px -12px color-mix(in srgb, var(--text-primary) 30%, transparent);
  font-family: var(--font-en);
  font-size: var(--fs-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--text-primary);
  cursor: pointer;
  transition:
    background-color var(--hk-dur-fast) var(--hk-ease),
    color var(--hk-dur-fast) var(--hk-ease),
    border-color var(--hk-dur-fast) var(--hk-ease),
    transform var(--hk-dur-instant) var(--hk-ease);
}
@media (hover: hover) {
  .hknav-menupill:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--text-on-inverse);
  }
}
.hknav-menupill:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--surface-base), 0 0 0 4px var(--focus-ring);
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--text-on-inverse);
}
.hknav-menupill:active { transform: scale(0.97); }

/* --- icon button (hamburger / overlay close) -------------------------------- */
.hknav-iconbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--hk-border);
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition:
    background-color var(--hk-dur-fast) var(--hk-ease),
    color var(--hk-dur-fast) var(--hk-ease),
    border-color var(--hk-dur-fast) var(--hk-ease);
}
@media (hover: hover) {
  .hknav-iconbtn:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--text-on-inverse);
  }
}
.hknav-iconbtn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--surface-base), 0 0 0 4px var(--focus-ring);
}
/* The runtime-injected sheet loads after Tailwind, so responsive display
 * utilities (xl:hidden) lose the cascade against .hknav-iconbtn. Hide the
 * hamburger here instead (xl breakpoint = 1280px, a size, not motion). */
@media (min-width: 1280px) {
  .hknav-hamburger { display: none; }
}

/* --- overlay ----------------------------------------------------------------- */
.hknav-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: var(--surface-base);
  overflow-y: auto;
}
.hknav-olink {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.9rem 0.25rem;
  border-bottom: 1px solid var(--hk-border);
  text-decoration: none;
  color: var(--text-primary);
  transition: color var(--hk-dur-fast) var(--hk-ease);
}
.hknav-olink::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1.5px;
  background: var(--color-accent);
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform var(--hk-dur-fast) var(--hk-ease);
}
@media (hover: hover) {
  .hknav-olink:hover { color: var(--color-accent); }
  .hknav-olink:hover::after {
    transform: scaleX(1);
    transform-origin: left center;
  }
}
.hknav-olink:focus-visible {
  outline: none;
  color: var(--color-accent);
  box-shadow: 0 0 0 2px var(--focus-ring);
  border-radius: var(--radius-sm);
}
.hknav-olink:focus-visible::after { transform: scaleX(1); }
.hknav-olink--active { color: var(--color-accent); }
.hknav-olink--active::after { transform: scaleX(1); }
.hknav-olink-jp {
  font-family: var(--font-jp);
  font-size: var(--fs-h3);
  font-weight: 600;
  letter-spacing: 0.01em;
}
.hknav-olink-en {
  font-family: var(--font-en);
  font-size: var(--fs-label);
  letter-spacing: 0.08em;
  color: var(--text-secondary);
  text-transform: uppercase;
}

/* --- reduced motion: hovers become instant state changes -------------------- */
@media (prefers-reduced-motion: reduce) {
  .hknav-scope,
  .hknav-scope *,
  .hknav-link::after,
  .hknav-olink::after,
  .hknav-pill::before {
    transition: none !important;
  }
}
`;

let styleInjected = false;
function useNavStyles() {
  React.useEffect(() => {
    if (styleInjected || typeof document === "undefined") return;
    const el = document.createElement("style");
    el.setAttribute("data-hknav", "");
    el.textContent = NAV_STYLE;
    document.head.appendChild(el);
    styleInjected = true;
  }, []);
}

/* ---------------------------------------------------------- desktop item --- */

function DesktopNavItem({ item }: { item: NavItem }) {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLLIElement>(null);

  const selfActive = location.pathname === item.to;
  const childActive =
    item.children?.some((c) => location.pathname === c.to) ?? false;
  const active = selfActive || childActive;

  if (!item.children) {
    return (
      <li>
        <Link
          to={item.to}
          className={`hknav-link${active ? " hknav-link--active" : ""}`}
          aria-current={active ? "page" : undefined}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          ref.current?.querySelector("a")?.focus();
        }
      }}
    >
      <Link
        to={item.to}
        className={`hknav-link${active ? " hknav-link--active" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={selfActive ? "page" : undefined}
      >
        {item.label}
        <ChevronDown
          className={`hknav-chevron${open ? " hknav-chevron--open" : ""}`}
          aria-hidden="true"
        />
      </Link>
      <AnimatePresence>
        {open && (
          <m.div
            className="hknav-ddwrap"
            initial={{ opacity: 0, y: PANEL_OFFSET_Y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: PANEL_OFFSET_Y }}
            transition={{ duration: dur.fast, ease: ease.soft }}
          >
            <div className="hknav-ddpanel">
              {item.children.map((child) => {
                const childIsActive = location.pathname === child.to;
                return (
                  <Link
                    key={child.to}
                    to={child.to}
                    className={`hknav-ddlink${childIsActive ? " hknav-ddlink--active" : ""}`}
                    aria-current={childIsActive ? "page" : undefined}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ------------------------------------------------------- overlay variants --- */

const overlayList = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.tight } },
} as const;

const overlayItem = {
  hidden: { opacity: 0, y: dist.revealY },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: dur.reveal, ease: ease.out },
  },
} as const;

/* --------------------------------------------------------------- component --- */

const Header: React.FC = () => {
  useNavStyles();
  const location = useLocation();
  const phase = useNavPhase();
  const { openChat } = useAiChat();

  const [overlayOpen, setOverlayOpen] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);

  const openOverlay = () => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setOverlayOpen(true);
  };
  const closeOverlay = React.useCallback(() => {
    setOverlayOpen(false);
    /* setTimeout(0): runs after React commits, independent of rAF throttling. */
    window.setTimeout(() => {
      openerRef.current?.focus({ preventScroll: true });
    }, 0);
  }, []);

  /* Route change closes the overlay (C-1 AC⑤). */
  React.useEffect(() => {
    setOverlayOpen(false);
  }, [location.pathname]);

  /* Scroll lock while the overlay is open. */
  React.useEffect(() => {
    if (!overlayOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [overlayOpen]);

  /* Move focus into the dialog on open. */
  React.useEffect(() => {
    if (overlayOpen) {
      const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
      return () => window.clearTimeout(t);
    }
  }, [overlayOpen]);

  /* Minimal focus trap + Esc (C-1 AC②③). */
  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closeOverlay();
      return;
    }
    if (e.key !== "Tab") return;
    const root = overlayRef.current;
    if (!root) return;
    const focusables = root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const scrollToTop = () => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const condensed = phase === "condensed";

  return (
    <>
      {/* ------------------------------------------------ sticky full bar --- */}
      <header
        className={`hknav-scope hknav-head sticky top-0 z-50${
          condensed ? " hknav-head--condensed" : ""
        }`}
      >
        <div className="hknav-bar">
          <nav
            className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-8 xl:h-20"
            aria-label="グローバルナビゲーション"
          >
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" aria-label="honkoma ホーム">
              <img
                className="h-9 w-auto xl:h-10"
                src="/assets/hotel/honkoma-logo-blue.png"
                alt="honkoma"
              />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden items-center gap-1 xl:flex">
              {NAV.map((item) => (
                <DesktopNavItem key={item.to} item={item} />
              ))}
            </ul>

            {/* Desktop CTA pills (LayerX dual-pill slot) */}
            <div className="hidden items-center gap-3 xl:flex">
              <button
                type="button"
                className="hknav-pill hknav-pill--outline"
                onClick={() => openChat({ source: "header" })}
              >
                <span>{CTA_AI_LABEL}</span>
              </button>
              <Link to={CTA_PRIMARY.to} className="hknav-pill hknav-pill--fill">
                <span>{CTA_PRIMARY.label}</span>
              </Link>
            </div>

            {/* Mobile hamburger -> shared overlay */}
            <button
              type="button"
              className="hknav-iconbtn hknav-hamburger"
              onClick={openOverlay}
              aria-haspopup="dialog"
              aria-expanded={overlayOpen}
              aria-controls="hknav-overlay"
            >
              <span className="sr-only">メニューを開く</span>
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </header>

      {/* ------------------------------------- condensed floating cluster --- */}
      <AnimatePresence>
        {condensed && (
          <m.div
            key="menupill"
            className="hknav-scope fixed top-4 z-50"
            style={{ left: "var(--space-gutter)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: dur.base, ease: ease.out }}
          >
            <button
              type="button"
              className="hknav-menupill"
              onClick={openOverlay}
              aria-haspopup="dialog"
              aria-expanded={overlayOpen}
              aria-controls="hknav-overlay"
            >
              Menu
            </button>
          </m.div>
        )}
        {condensed && (
          <m.div
            key="totop"
            className="hknav-scope fixed top-4 z-50"
            style={{ right: "var(--space-gutter)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: dur.base,
              ease: ease.out,
              delay: stagger.base,
            }}
          >
            <ArrowCTA
              label="ページ上部へ戻る"
              size="sm"
              variant="outline"
              direction="up"
              onClick={scrollToTop}
            />
          </m.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------- full-screen overlay --- */}
      <AnimatePresence>
        {overlayOpen && (
          <m.div
            id="hknav-overlay"
            ref={overlayRef}
            className="hknav-scope hknav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="メニュー"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: dur.fast, ease: ease.out }}
            onKeyDown={handleOverlayKeyDown}
          >
            <div className="mx-auto flex min-h-full max-w-[1200px] flex-col px-6 lg:px-8">
              {/* Overlay header row */}
              <div className="flex h-16 flex-shrink-0 items-center justify-between xl:h-20">
                <Link
                  to="/"
                  onClick={closeOverlay}
                  aria-label="honkoma ホーム"
                >
                  <img
                    className="h-9 w-auto xl:h-10"
                    src="/assets/hotel/honkoma-logo-blue.png"
                    alt="honkoma"
                  />
                </Link>
                <button
                  type="button"
                  ref={closeBtnRef}
                  className="hknav-iconbtn"
                  onClick={closeOverlay}
                >
                  <span className="sr-only">メニューを閉じる</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <m.nav
                className="flex flex-1 flex-col justify-center py-10"
                aria-label="メニュー"
                variants={overlayList}
                initial="hidden"
                animate="visible"
              >
                <ul>
                  {OVERLAY_LINKS.map((link) => {
                    const active = location.pathname === link.to;
                    return (
                      <m.li key={link.to} variants={overlayItem}>
                        <Link
                          to={link.to}
                          onClick={closeOverlay}
                          className={`hknav-olink${active ? " hknav-olink--active" : ""}`}
                          aria-current={active ? "page" : undefined}
                        >
                          <span className="hknav-olink-jp">{link.label}</span>
                          <span className="hknav-olink-en">{link.en}</span>
                        </Link>
                      </m.li>
                    );
                  })}
                </ul>
                <m.div
                  variants={overlayItem}
                  className="mt-10 flex flex-wrap items-center gap-3"
                >
                  <button
                    type="button"
                    onClick={() => {
                      closeOverlay();
                      openChat({ source: "header" });
                    }}
                    className="hknav-pill hknav-pill--outline"
                  >
                    <span>{CTA_AI_LABEL}</span>
                  </button>
                  <Link
                    to={CTA_PRIMARY.to}
                    onClick={closeOverlay}
                    className="hknav-pill hknav-pill--fill"
                  >
                    <span>{CTA_PRIMARY.label}</span>
                  </Link>
                </m.div>
              </m.nav>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
