'use client'

import BreadCrumb from "@/components/elements/breadcrumb";
import IconDatabase from "@/components/icon/icon-database";
import TableSkeletonComponent from "@/components/loading/table-skeleton";
import DataTableAdminQuestion from "./data-table";
import {Suspense, useState} from "react";
import Select from 'react-select';
import {generateYearOptions} from "@/utils/date-utils";

const QuestionPage = () => {
    const listYear = generateYearOptions();
    const [year, setYear] = useState(listYear[0]!.value);
  return (
      <>
        <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary dark:bg-primary-old"/>
        <div className="flex justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-white-light">Pertanyaan</h1>
            <BreadCrumb routes={[{label: 'Pertanyaan'}]}/>
          </div>
          <div className="custom-select">
              <Select className="max-w-24" defaultValue={listYear[0]} options={listYear} placeholder="Tahun" isSearchable={false} onChange={(val) => setYear(val!.value)} />
          </div>
        </div>
        <div
            className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
          <h3 className="mb-3 flex text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
            <IconDatabase className="mr-3"/>
            Daftar Survey HEDR Tahun {year}
          </h3>
          <Suspense fallback={<TableSkeletonComponent/>}>
            <DataTableAdminQuestion year={year}/>
          </Suspense>
        </div>
      </>
  )
}

export default QuestionPage
