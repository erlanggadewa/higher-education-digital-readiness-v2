'use client';
import DataTableReviewerFormGroupCampus from '@/app/(defaults)/reviewer/campus/form-group/data-table';
import ElementsBreadcrumbsDefault from '@/components/breadcrumbs/elements-breadcrumbs-default';
import IconDatabase from '@/components/icon/icon-database';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import TabsFormGroup from '@/components/tabs/tabs-form-group';
import { generateYearOptions } from '@/utils/date-utils';
import { Suspense, useState } from 'react';
import Select from 'react-select';

function ReviewerFormGroupCampusPage() {
  const listYear = generateYearOptions();
  const [year, setYear] = useState(listYear[0]!.value);
  const [selectedTab, setSelectedTab] = useState<'Sedang Direview' | 'Belum Direview' | 'Sudah Direview' | 'Semua'>('Semua');

  return (
    <div>
      <div className="banner flex h-40 flex-wrap justify-between gap-3">
        <div>
          <h1 className="text-xl text-white">Review Survey Campus</h1>
          <ElementsBreadcrumbsDefault data={['Reviewer', 'Campus']} />
        </div>
        <div className="custom-select">
          <Select className="max-w-24" defaultValue={listYear[0]} options={listYear} placeholder="Tahun" isSearchable={false} onChange={(val) => setYear(val!.value)} />
        </div>
      </div>
      <div className="panel -mt-14">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <IconDatabase />
          <h1>Daftar Survey HEDR</h1>
          <span className="badge bg-primary">{year}</span>
        </div>
        <div className="my-3">
          <TabsFormGroup setSelectedTab={setSelectedTab} />
        </div>
        <Suspense fallback={<TableSkeletonComponent />}>
          <DataTableReviewerFormGroupCampus year={year} selectedTab={selectedTab} />
        </Suspense>
      </div>
    </div>
  );
}

export default ReviewerFormGroupCampusPage;
