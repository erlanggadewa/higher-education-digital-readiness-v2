'use client';
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
      <div className="panel">
        <div className="flex items-center gap-3 text-2xl font-bold">
          <IconDatabase />
          <h1>Daftar Survey HEDR</h1>
          <span className="badge bg-primary">{year}</span>
        </div>
        <div className="my-4 flex items-center justify-between">
          <div className="custom-select">
            <Select className="max-w-24" defaultValue={listYear[0]} options={listYear} placeholder="Tahun" isSearchable={true} onChange={(val) => setYear(val!.value)} />
          </div>
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
