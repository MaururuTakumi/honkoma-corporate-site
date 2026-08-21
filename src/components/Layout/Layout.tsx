import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { AiChatProvider } from '../../features/ai-chat/ChatProvider';
import { ChatDrawer } from '../../features/ai-chat/components/ChatDrawer';
import { FloatingChatLauncher } from '../../features/ai-chat/components/FloatingChatLauncher';
import { RouteAnalytics } from '../../features/analytics/RouteAnalytics';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  /* /ai は診断ページ自体がChatStageを内包するため、ドロワー/フローティングは出さない。 */
  const pathname = useLocation().pathname;
  const onAiPage = pathname === '/ai';
  /* /manga-ip はサブドメイン相当の独立LP。既存コーポレートUIを重ねない。 */
  const onMangaIpPage = pathname === '/manga-ip';

  if (onMangaIpPage) {
    return (
      <>
        <RouteAnalytics />
        <div className="min-h-screen bg-white">
          <main>{children}</main>
        </div>
      </>
    );
  }

  return (
    <AiChatProvider>
      <RouteAnalytics />
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
      {!onAiPage && <FloatingChatLauncher />}
      {!onAiPage && <ChatDrawer />}
    </AiChatProvider>
  );
};

export default Layout;
