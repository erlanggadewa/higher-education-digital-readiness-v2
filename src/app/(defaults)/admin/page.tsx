'use client';

import BreadCrumb from '@/components/elements/breadcrumb';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import Tab from '@/components/tabs/tabs-admin-form-group';
import { cn } from '@/utils/cn';
import { Suspense, useState } from 'react';
import DataTableDashboard from './data-table';

const CardDashboard = ({ count, label, color }: { count: number; label: string; color: string }) => {
  return (
    <div className={cn('w-full max-w-[19rem] rounded-lg border border-[#e0e6ed] shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-none dark:shadow-none', color)}>
      <div className="px-8 py-6">
        <h5 className="mb-2 text-2xl font-bold text-white-light">{count}</h5>
        <h6 className="text-lg font-semibold text-white-light">{label}</h6>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState('');
  console.log(selectedTab);
  return (
    <>
      <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary" />
      <div className="flex justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-white-light">Dashboard</h1>
          <BreadCrumb routes={[{ label: 'Dashboard' }]} />
        </div>
        <div>
          <button type="button" className="btn bg-white dark:bg-[#191e3a] dark:border-[#1b2e4b] dark:shadow-none">
            Respon Pertanyaan
          </button>
        </div>
      </div>
      <div className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <h3 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">Selamat datang, Admin</h3>
      </div>
      <div className="mb-5 flex gap-3">
        <CardDashboard color="bg-primary" count={6} label="Telah Mengisi" />
        <CardDashboard color="bg-warning dark:bg-warning-old" count={6} label="Belum Mengisi" />
        <CardDashboard color="bg-info dark:bg-info-old" count={6} label="Telah Direview" />
        <CardDashboard color="bg-success dark:bg-success-old" count={6} label="Sedang Direview" />
        <CardDashboard color="bg-danger dark:bg-danger-old" count={6} label="Belum Direview" />
      </div>
      <div className="w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <h3 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">Daftar Skor Kampus</h3>
        <Tab setSelectedTab={setSelectedTab} />
        <Suspense fallback={<TableSkeletonComponent />}>
          <DataTableDashboard year={2024} />
        </Suspense>
      </div>
    </>
  );
};

export default AdminPage;
