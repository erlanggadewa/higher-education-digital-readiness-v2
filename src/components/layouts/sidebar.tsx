'use client';
import IconCaretsDown from '@/components/icon/icon-carets-down';

import { type IRootState } from '@/store';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { Session } from 'next-auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuAdmin, menuCampus, menuReviewer, MenuVertical } from './menu';

function Sidebar({ session }: { session: Session | null }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [pathname]);

  const setActiveRoute = () => {
    const allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    selector?.classList.add('active');
  };

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <img className="ml-[5px] w-10 flex-none" src="/assets/images/hedr.png" alt="logo" />
              <span className="align-middle text-2xl font-semibold dark:text-white-light lg:inline ltr:ml-3 rtl:mr-3">HEDR</span>
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown fill className="m-auto rotate-90" />
            </button>
          </div>
          {/* Menu Vertical */}

          {session?.user.role === 'admin' && <MenuVertical listMenu={menuAdmin} />}
          {session?.user.role === 'campus' && <MenuVertical listMenu={menuCampus} />}
          {session?.user.role === 'reviewer' && <MenuVertical listMenu={menuReviewer} />}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
