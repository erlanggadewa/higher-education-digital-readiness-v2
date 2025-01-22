'use client';
import IconDatabase from '@/components/icon/icon-database';
import TableSkeletonComponent from '@/components/loading/table-skeleton';
import TabsCampusFormGroup from '@/components/tabs/tabs-campus-form-group';
import { api } from '@/trpc/react';
import { Suspense, useState, use } from 'react';
import DataTableReviewerSelectedCampus from './data-table';

function ReviewerSelectedCampus(props: { params: Promise<{ campusId: string; formGroupId: string }> }) {
  const params = use(props.params);
  const [variable] = api.reviewer.campus.getMappedVariableOnFormGroup.useSuspenseQuery({ formGroupId: params.formGroupId });

  const [variableId, setVariableId] = useState(variable[0]!.id);

  const [data] = api.reviewer.campus.getSelectedProfilCampusReview.useSuspenseQuery({ campusUserId: params.campusId, formGroupId: params.formGroupId });

  return (
    <div>
      <div className="banner flex h-40 flex-wrap justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <img className="w-12 overflow-hidden rounded-full bg-white object-cover" src={data.campus?.campusUser.image ?? ''} alt="img" />
            <div>
              <h1 className="text-xl text-white">{data.campus?.campusUser.name}</h1>
              <p className="text-white">{data.campus?.campusUser.email}</p>
            </div>
          </div>
          {/* <ElementsBreadcrumbsDefault data={['Reviewer', 'Campus', 'Survei']} /> */}
        </div>
      </div>

      <div className="panel -mt-16">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <IconDatabase />
          <h1>{data.formGroupName}</h1>
          <span className="badge bg-primary">Kampus</span>
        </div>

        <div className="mb-8 mt-3">
          <TabsCampusFormGroup setSelectedTab={setVariableId} tabs={variable} />
        </div>
        <Suspense fallback={<TableSkeletonComponent />}>
          <DataTableReviewerSelectedCampus campusUserId={params.campusId} formGroupId={params.formGroupId} variableId={variableId} />
        </Suspense>
      </div>
    </div>
  );
}

export default ReviewerSelectedCampus;
