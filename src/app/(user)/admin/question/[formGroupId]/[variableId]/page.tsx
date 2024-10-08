import BreadCrumb from '@/components/elements/breadcrumb';
import IconDatabase from '@/components/icon/icon-database';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import { api } from '@/trpc/server';
import { Suspense } from 'react';
import DataTableAdminQuestion from './data-table';

const VariableDetailPage = async ({ params }: { params: { formGroupId: string; variableId: string } }) => {
  const dataQuestion = await api.admin.question.getQuestion({
    formGroupId: params.formGroupId,
    variableId: params.variableId,
  });
  return (
    <>
      <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary" />
      <div className="flex justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-white-light">
            {dataQuestion.variable?.alias} - {dataQuestion.formGroup?.name}
          </h1>
          <BreadCrumb routes={[{ label: 'Survey', path: '/admin/question' }, { label: 'List Variabel', path: `/admin/question/${params.formGroupId}` }, { label: 'Pertanyaan' }]} />
        </div>
      </div>
      <div className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <h3 className="mb-3 flex text-xl font-semibold text-[#3b3f5c] dark:text-white-light">
          <IconDatabase className="mr-3" />
          Daftar Pertanyaan {dataQuestion.variable?.alias} ({dataQuestion.variable?.name})
        </h3>
        <Suspense fallback={<TableSkeletonComponent />}>
          <DataTableAdminQuestion data={dataQuestion ?? []} />
        </Suspense>
      </div>
    </>
  );
};

export default VariableDetailPage;
