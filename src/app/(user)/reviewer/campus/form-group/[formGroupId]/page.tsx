import ElementsBreadcrumbsDefault from '@/components/breadcrumbs/elements-breadcrumbs-default';
import IconUniversity from '@/components/icon/icon-university';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import { api } from '@/trpc/server';
import { Suspense } from 'react';
import DataTableReviewerSelectedFormGroupCampus from './data-table';

async function ReviewerSelectedFormGroupCampusPage(props: { params: Promise<{ formGroupId: string }> }) {
  const params = await props.params;
  const rowData = await api.reviewer.dashboard.getSelectedFormGroup({ formGroupId: params.formGroupId });

  return (
    <div>
      <div className="banner flex h-40 flex-wrap justify-between gap-3">
        <div>
          <h1 className="text-xl text-white">Review Survey Campus</h1>
          <ElementsBreadcrumbsDefault data={['Reviewer', 'Campus', 'Survei']} />
        </div>
      </div>

      <div className="panel -mt-16">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <IconUniversity />
          <h1>{`Daftar Responden Survei ${rowData.formGroup.formGroupName}`}</h1>
          <span className="badge bg-primary">Kampus</span>
        </div>

        <Suspense fallback={<TableSkeletonComponent />}>
          <DataTableReviewerSelectedFormGroupCampus rowData={rowData.campus} formGroupId={params.formGroupId} />
        </Suspense>
      </div>
    </div>
  );
}

export default ReviewerSelectedFormGroupCampusPage;
