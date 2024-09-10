'use client';
import { type IRootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';

const MainContainerPublic = ({ children }: { children: React.ReactNode }) => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  return <div className={`${themeConfig.navbar} min-h-screen text-black dark:text-white-dark`}> {children}</div>;
};

export default MainContainerPublic;
