import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import MainContainerPublic from '@/components/layouts/main-container-public';
import Overlay from '@/components/layouts/overlay';
import ScrollToTop from '@/components/layouts/scroll-to-top';
import Setting from '@/components/layouts/setting';
import Portals from '@/components/portal/portals';
import { getServerAuthSession } from '@/server/auth';

export default async function DefaultPublicLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerAuthSession();

  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        <Overlay />
        <ScrollToTop />

        {/* BEGIN APP SETTING LAUNCHER */}
        <Setting />
        {/* END APP SETTING LAUNCHER */}

        <MainContainerPublic>
          <div className="main-content flex min-h-screen flex-col">
            {/* BEGIN CONTENT AREA */}
            <ContentAnimation>{children}</ContentAnimation>
            {/* END CONTENT AREA */}

            {/* BEGIN FOOTER */}
            <Footer />
            {/* END FOOTER */}
            <Portals />
          </div>
        </MainContainerPublic>
      </div>
    </>
  );
}
