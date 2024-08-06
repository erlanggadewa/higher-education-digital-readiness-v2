import ElementsBreadcrumbsDefault from '@/components/breadcrumbs/elements-breadcrumbs-default';
import IconDatabase from '@/components/icon/icon-database';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import { api } from '@/trpc/server';
import { Suspense } from 'react';
import DataTableReviewerSelectedFormGroupCampusComponent from './data-table';

async function ReviewerSelectedFormGroupCampusPage({ params }: { params: { id: string } }) {
  const rowData = await api.reviewer.campus.getSelectedFormGroup({ formGroupId: params.id });

  return (
    <div>
      <div className="banner flex h-40 flex-wrap justify-between gap-3">
        <div>
          <h1 className="text-xl text-white">Review Survey Campus</h1>
          <ElementsBreadcrumbsDefault />
        </div>
      </div>

      <div className="panel -my-20">
        <div className="flex items-center gap-3 text-lg font-bold">
          <IconDatabase />
          <h1>{`Daftar Responden Survei ${rowData.formGroup.formGroupName}`}</h1>
          <span className="badge bg-primary">Kampus</span>
        </div>

        <Suspense fallback={<TableSkeletonComponent />}>
          <DataTableReviewerSelectedFormGroupCampusComponent rowData={rowData.campus} />
        </Suspense>
      </div>
    </div>
  );
}

export default ReviewerSelectedFormGroupCampusPage;
