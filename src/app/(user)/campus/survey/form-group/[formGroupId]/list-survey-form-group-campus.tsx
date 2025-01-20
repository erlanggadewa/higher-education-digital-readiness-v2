import ElementsBreadcrumbsDefault from '@/components/breadcrumbs/elements-breadcrumbs-default';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import DataTableCampusSelectedFormGroup from './data-table';

async function ListSurveyFormGroupCampus({ params }: { params: { formGroupId: string } }) {
  const session = await getServerAuthSession();
  const data = await api.campus.campusSurvey.getSelectedFormGroup({ campusId: session?.user.id ?? '', formGroupId: params.formGroupId });

  return (
    <div>
      <div className="banner flex h-40 flex-wrap justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <img className="w-12 overflow-hidden rounded-full bg-white object-cover" src={session?.user.image ?? ''} alt="img" />
            <div className="justify-center-center flex flex-col gap-1">
              <h1 className="text-xl text-white">{session?.user.name}</h1>
              <ElementsBreadcrumbsDefault data={['Campus', 'Survey', data.formGroupName ?? '']} />
            </div>
          </div>
        </div>
      </div>
      <div className="panel -mt-16">
        <div className="mb-3">
          <div className="flex items-center gap-3 text-lg font-bold">
            <h1>{data.formGroupName ?? ''}</h1>
            <span className="badge bg-primary">Kampus</span>
          </div>
          <h6 className="mt-2">{data.formGroupDescription ?? ''}</h6>
        </div>
        <DataTableCampusSelectedFormGroup data={data} />
      </div>
    </div>
  );
}

export default ListSurveyFormGroupCampus;
