import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// Design system English accent font (Space Grotesk, latin subset only).
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-700.css";
// Design system tokens (color/spacing/radius/typography scale + inverse theme).
import "./design/tokens.css";
import { MotionProvider } from "./motion/MotionProvider";
import { WedgeOverlay } from "./components/motion/Wedge";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import TeamPage from "./pages/TeamPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyDetailPage from "./pages/CaseStudyDetailPage";
import RecruitPage from "./pages/RecruitPage";
import AiDiagnosisPage from "./pages/AiDiagnosisPage";
import MangaIpPage from "./pages/MangaIpPage";

// DEV-only primitive catalog. Lazily imported so it stays out of prod bundles.
const MotionLab = import.meta.env.DEV
  ? lazy(() => import("./pages/_lab/MotionLab"))
  : null;

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <MotionProvider>
        <Layout>
          <WedgeOverlay>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ai" element={<AiDiagnosisPage />} />
            <Route path="/manga-ip" element={<MangaIpPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/recruit" element={<RecruitPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
            {/* site-ia-design §7 M10: /d2c・/review-ai・ホテル向け(/hotel等)はLPから撤去→/product へ集約。
                SPA のため 301 は張れないので client redirect（sitemap/内部リンクからも除去済）。 */}
            <Route path="/hotel" element={<Navigate to="/product" replace />} />
            <Route path="/hotels" element={<Navigate to="/product" replace />} />
            <Route path="/hasip" element={<Navigate to="/product" replace />} />
            <Route path="/d2c" element={<Navigate to="/product" replace />} />
            <Route path="/review-ai" element={<Navigate to="/product" replace />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            {MotionLab && (
              <Route
                path="/_lab"
                element={
                  <Suspense fallback={null}>
                    <MotionLab />
                  </Suspense>
                }
              />
            )}
          </Routes>
          </WedgeOverlay>
        </Layout>
        </MotionProvider>
      </Router>
    </HelmetProvider>
  </StrictMode>,
);
