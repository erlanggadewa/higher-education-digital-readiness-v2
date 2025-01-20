import ElementsBreadcrumbsDefault from '@/components/breadcrumbs/elements-breadcrumbs-default';
import IconDatabase from '@/components/icon/icon-database';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import DataTableCampusFormGroup from './data-table';

async function ListSurveyCampus() {
  const session = await getServerAuthSession();
  const data = await api.campus.campusSurvey.getCampusSurvey({ campusId: session?.user.id ?? '' });

  return (
    <div>
      <div className="banner flex h-40 flex-wrap justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <img className="w-12 overflow-hidden rounded-full bg-white object-cover" src={session?.user.image ?? ''} alt="img" />
            <div className="justify-center-center flex flex-col gap-1">
              <h1 className="text-xl text-white">{session?.user.name}</h1>
              <ElementsBreadcrumbsDefault data={['Campus', 'Survey']} />
            </div>
          </div>
        </div>
      </div>
      <div className="panel -mt-16">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <IconDatabase />
          <h1>Daftar Survei Kampus</h1>
          <span className="badge bg-primary">Kampus</span>
        </div>
        <p className="mb-3">Daftar survei yang wajib dikerjakan untuk kampus </p>
        <DataTableCampusFormGroup data={data} />
      </div>
    </div>
  );
}

export default ListSurveyCampus;
