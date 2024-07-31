'use client';
import ElementsBreadcrumbsDefault from '@/components/breadcrumbs/elements-breadcrumbs-default';
import IconDatabase from '@/components/icon/icon-database';
import DataTableComponent from '@/components/layouts/reviewer/campus/form-group/data-table';
import TabsFormGroupCampus from '@/components/layouts/reviewer/campus/form-group/tabs';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import { generateYearOptions } from '@/utils/date-utils';
import { Suspense, useState } from 'react';
import Select from 'react-select';

function ReviewerFormGroupCampusPage() {
  const listYear = generateYearOptions();
  const [year, setYear] = useState(listYear[0]!.value);

  return (
    <div>
      <div className="banner flex h-40 flex-wrap justify-between gap-3">
        <div>
          <h1 className="text-xl text-white">Review Survey Campus</h1>
          <ElementsBreadcrumbsDefault />
        </div>
        <div className="custom-select">
          <Select className="max-w-24" defaultValue={listYear[0]} options={listYear} placeholder="Tahun" isSearchable={false} onChange={(val) => setYear(val!.value)} />
        </div>
      </div>
      <div className="panel -my-20">
        <div className="flex items-center gap-3 text-lg font-bold">
          <IconDatabase />
          <h1>Daftar Survey HEDR</h1>
          <span className="badge bg-primary">{year}</span>
        </div>
        <div className="my-3">
          <TabsFormGroupCampus />
        </div>
        <Suspense fallback={<TableSkeletonComponent />}>
          <DataTableComponent year={year} />
        </Suspense>
      </div>
    </div>
  );
}

export default ReviewerFormGroupCampusPage;
