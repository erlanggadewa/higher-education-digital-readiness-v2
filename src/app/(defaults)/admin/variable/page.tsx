'use client';

import BreadCrumb from '@/components/elements/breadcrumb';
import { Suspense } from 'react';
import DataTableVariable from './data-table';
import TableSkeletonComponent from '@/components/loading/table-skeleton';

const VariablePage = () => {
  return (
    <>
      <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary" />
      <div className="flex justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-white-light">Variabel</h1>
          <BreadCrumb routes={[{ label: 'Variabel' }]} />
        </div>
        <div>
          <button type="button" className="btn bg-white dark:text-[#3b3f5c]">
            Tambah Variabel
          </button>
        </div>
      </div>
      <div className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <h3 className="mb-3 text-xl font-semibold text-[#3b3f5c] dark:text-white-light">Daftar Variabel</h3>
        <Suspense fallback={<TableSkeletonComponent />}>
          <DataTableVariable />
        </Suspense>
      </div>
    </>
  );
};

export default VariablePage;
