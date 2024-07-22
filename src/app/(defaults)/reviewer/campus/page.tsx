'use client';
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
      <h1>Reviewer Page</h1>
      <Suspense fallback={<TableSkeletonComponent />}>
        <div className="panel">
          <div className="my-4 flex items-center justify-between">
            <Select className="custom-select max-w-24" defaultValue={listYear[0]} options={listYear} placeholder="Tahun" isSearchable={true} onChange={(val) => setYear(val!.value)} />
            <TabsFormGroupCampus />
          </div>
          <DataTableComponent year={year} />
        </div>
      </Suspense>
    </div>
  );
}

export default ReviewerFormGroupCampusPage;
