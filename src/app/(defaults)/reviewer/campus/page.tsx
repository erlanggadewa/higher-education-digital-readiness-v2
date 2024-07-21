'use client';
import DataTableComponent from '@/components/layouts/reviewer/campus/form-group/data-table';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import { generateYearOptions } from '@/utils/date-utils';
import { Tab } from '@headlessui/react';
import { Fragment, Suspense, useState } from 'react';
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
            <Tab.Group>
              <Tab.List className="flex flex-wrap items-center justify-between space-x-2 rtl:space-x-reverse">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <div className="flex-auto text-center !outline-none">
                      <button className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block w-full rounded p-3.5 py-2 before:inline-block hover:bg-primary hover:text-white`}>
                        Home
                      </button>
                    </div>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <div className="flex-auto text-center !outline-none">
                      <button className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block w-full rounded p-3.5 py-2 before:inline-block hover:bg-primary hover:text-white`}>
                        Profile
                      </button>
                    </div>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <div className="flex-auto text-center !outline-none">
                      <button className={`${selected ? 'bg-primary text-white !outline-none' : ''} -mb-[1px] block w-full rounded p-3.5 py-2 before:inline-block hover:bg-primary hover:text-white`}>
                        Contact
                      </button>
                    </div>
                  )}
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
          <DataTableComponent year={year} />
        </div>
      </Suspense>
    </div>
  );
}

export default ReviewerFormGroupCampusPage;
