'use client';
import Dropdown from '@/components/dropdown/dropdown';
import IconLaptop from '@/components/icon/icon-laptop';
import IconLogout from '@/components/icon/icon-logout';
import IconMenu from '@/components/icon/icon-menu';
import IconMoon from '@/components/icon/icon-moon';
import IconSun from '@/components/icon/icon-sun';
import { type IRootState } from '@/store';
import { toggleSidebar, toggleTheme } from '@/store/themeConfigSlice';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuAdmin, menuCampus, MenuHorizontal, menuReviewer } from './menu';

function Header({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"] .nav-link');
    if (selector) {
      const all = document.querySelectorAll<HTMLElement>('ul.horizontal-menu .nav-link.active');

      for (const element of all) {
        element.classList.remove('active');
      }

      const allLinks = document.querySelectorAll<HTMLElement>('ul.horizontal-menu a.active');
      for (const element of allLinks) {
        element.classList.remove('active');
      }
      selector?.classList.add('active');
    }
  }, [pathname]);

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const themeConfig = useSelector((state: IRootState) => state.themeConfig);

  return (
    <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
      <div className="shadow-sm">
        <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
          <div className="horizontal-logo flex items-center justify-between lg:hidden ltr:mr-2 rtl:ml-2">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <img className="inline w-10 ltr:-ml-1 rtl:-mr-1" src="/assets/images/hedr.png" alt="logo" />
              <span className="hidden align-middle text-2xl font-semibold transition-all duration-300 dark:text-white-light md:inline ltr:ml-3 rtl:mr-3">HEDR</span>
            </Link>
            <button
              type="button"
              className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:text-[#d0d2d6] dark:hover:bg-dark/60 dark:hover:text-primary lg:hidden ltr:ml-2 rtl:mr-2"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
          <div className="hidden sm:block ltr:mr-2 rtl:ml-2"></div>

          <div className="flex items-center space-x-1.5 dark:text-[#d0d2d6] sm:flex-1 lg:space-x-2 ltr:ml-auto ltr:sm:ml-0 rtl:mr-auto rtl:space-x-reverse sm:rtl:mr-0">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
            {/* Theme toggle */}
            <div>
              {themeConfig.theme === 'light' ? (
                <button
                  className={`${
                    themeConfig.theme === 'light' && 'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('dark'))}
                >
                  <IconSun />
                </button>
              ) : (
                ''
              )}
              {themeConfig.theme === 'dark' && (
                <button
                  className={`${
                    themeConfig.theme === 'dark' && 'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('system'))}
                >
                  <IconMoon />
                </button>
              )}
              {themeConfig.theme === 'system' && (
                <button
                  className={`${
                    themeConfig.theme === 'system' && 'flex items-center rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary dark:bg-dark/40 dark:hover:bg-dark/60'
                  }`}
                  onClick={() => dispatch(toggleTheme('light'))}
                >
                  <IconLaptop />
                </button>
              )}
            </div>

            <div className="dropdown flex shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="relative group block"
                button={
                  <img
                    className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src={
                      session?.user.role === 'admin'
                        ? '/assets/images/profile/admin.png'
                        : session?.user.role === 'reviewer'
                          ? '/assets/images/profile/reviewer.png'
                          : session?.user.image || '/assets/images/profile/default-user.jpg'
                    }
                    alt="userProfile"
                  />
                }
              >
                <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={
                          session?.user.role === 'admin'
                            ? '/assets/images/profile/admin.png'
                            : session?.user.role === 'reviewer'
                              ? '/assets/images/profile/reviewer.png'
                              : session?.user.image || '/assets/images/profile/default-user.jpg'
                        }
                        alt="userProfile"
                      />
                      <div className="truncate ltr:pl-4 rtl:pr-4">
                        <h4 className="text-base">{session?.user.role === 'admin' ? 'Admin HEDR' : session?.user.role === 'reviewer' ? 'Reviewer HEDR' : session?.user.name}</h4>
                        <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                          {session?.user.email}
                        </button>
                      </div>
                    </div>
                  </li>

                  <li className="border-t border-white-light dark:border-white-light/10">
                    <button className="!py-3 text-danger" onClick={() => signOut()}>
                      <IconLogout className="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                      Keluar
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>

        {/* horizontal menu */}
        {session?.user.role === 'admin' && <MenuHorizontal listMenu={menuAdmin} />}
        {session?.user.role === 'campus' && <MenuHorizontal listMenu={menuCampus} />}
        {session?.user.role === 'reviewer' && <MenuHorizontal listMenu={menuReviewer} />}
      </div>
    </header>
  );
}

export default Header;
