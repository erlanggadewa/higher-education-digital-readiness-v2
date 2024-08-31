import IconFlag from '@/components/icon/icon-flag';
import IconHome from '@/components/icon/icon-home';
import IconLevel from '@/components/icon/icon-level';
import IconQuestion from '@/components/icon/icon-question';
import IconUniversity from '@/components/icon/icon-university';
import Link from 'next/link';
import { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import IconArchive from '../icon/icon-archive';
import IconForm from '../icon/icon-form';
import IconFormPublic from '../icon/icon-form-public';
import IconRanking from '../icon/icon-ranking';
import IconResult from '../icon/icon-result';
import IconUsersGroup from '../icon/icon-users-group';

export type TMenu = {
  title: string;
  children: {
    title: string;
    icon: FC<{
      className?: string;
    }>;
    link: string;
  }[];
}[];

export const menuAdmin: TMenu = [
  {
    title: 'Utama',
    children: [
      {
        title: 'Dashboard',
        icon: IconHome,
        link: '/admin',
      },
    ],
  },
  {
    title: 'Form Survei',
    children: [
      {
        title: 'Pertanyaan',
        icon: IconQuestion,
        link: '/admin/question',
      },
      {
        title: 'Variabel',
        icon: IconFlag,
        link: '/admin/variable',
      },
      {
        title: 'Level',
        icon: IconLevel,
        link: '/admin/level',
      },
    ],
  },
  {
    title: 'Pengguna',
    children: [
      {
        title: 'Kampus',
        icon: IconUniversity,
        link: '/admin/campus',
      },
    ],
  },
];

export const menuCampus: TMenu = [
  {
    title: 'Utama',
    children: [
      {
        title: 'Dashboard',
        icon: IconHome,
        link: '/campus',
      },
    ],
  },
  {
    title: 'Form Survei',
    children: [
      {
        title: 'Survei Kampus',
        icon: IconForm,
        link: '/campus/survey',
      },
      {
        title: 'Survei Publik',
        icon: IconFormPublic,
        link: '/campus/survey/public',
      },
    ],
  },
  {
    title: 'Laporan',
    children: [
      {
        title: 'Hasil Survei',
        icon: IconResult,
        link: '/campus/result',
      },
      {
        title: 'Histori Survei',
        icon: IconArchive,
        link: '/campus/history',
      },
      {
        title: 'Peringkat',
        icon: IconRanking,
        link: '/campus/ranking',
      },
    ],
  },
];

export const menuReviewer: TMenu = [
  {
    title: 'Utama',
    children: [
      {
        title: 'Dashboard',
        icon: IconHome,
        link: '/admin',
      },
    ],
  },
  {
    title: 'Review',
    children: [
      {
        title: 'Kampus',
        icon: IconUniversity,
        link: '/reviewer/campus/form-group',
      },
      {
        title: 'Publik',
        icon: IconUsersGroup,
        link: '/reviewer/public/form-group',
      },
    ],
  },
];

export function MenuVertical({ listMenu }: { listMenu: TMenu }) {
  return (
    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
      <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
        {listMenu.map((menu, index) => {
          return (
            <li key={index} className="nav-item">
              {menu.title && (
                <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                  <span>{menu.title}</span>
                </h2>
              )}
              <ul>
                {menu.children &&
                  menu.children.map((child, i) => (
                    <li key={i} className="nav-item">
                      <Link href={child.link} className="group">
                        <div className="flex items-center">
                          <child.icon className="shrink-0 group-hover:!text-primary" />
                          <span className="text-black dark:text-white dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{child.title}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </PerfectScrollbar>
  );
}

export function MenuHorizontal({ listMenu }: { listMenu: TMenu }) {
  return (
    <>
      <ul className="horizontal-menu hidden border-t border-[#ebedf2] bg-white px-6 py-1.5 font-semibold text-black dark:border-[#111111] dark:bg-black dark:text-white-dark lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse">
        {listMenu.map((menu) => {
          return menu.children.map((child, i) => (
            <Link key={i} href={child.link}>
              <li className="menu nav-item relative">
                <button type="button" className="nav-link">
                  <div className="flex items-center">
                    <child.icon className="shrink-0" />
                    <span className="px-1">{child.title}</span>
                  </div>
                </button>
              </li>
            </Link>
          ));
        })}
      </ul>
    </>
  );
}
