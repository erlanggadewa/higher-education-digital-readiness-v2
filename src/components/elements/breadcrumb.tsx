import IconHome from '@/components/icon/icon-home';
import React from 'react';
import Link from 'next/link';

type BreadCrumbProps = {
  routes: {
    label: string;
    path?: string;
  }[];
};

const BreadCrumb = ({ routes }: BreadCrumbProps) => {
  return (
    <div className="mb-5">
      <ol className="flex font-semibold text-white-dark">
        <li>
          <Link href="/">
            <button type="button" className="hover:text-white-dark/70">
              <IconHome className="h-4 w-4" />
            </button>
          </Link>
        </li>
        {routes.map((route, index) => (
          <li className="before:px-1.5 before:content-['/']">
            {index === routes.length - 1 ? (
              <button type="button">{route.label}</button>
            ) : (
              <Link
                href={{
                  pathname: route.path,
                }}
              >
                <button type="button" className="text-white-light hover:text-white-light/70">
                  {route.label}
                </button>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BreadCrumb;
