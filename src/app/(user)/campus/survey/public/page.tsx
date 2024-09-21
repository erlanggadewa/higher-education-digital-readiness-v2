import ElementsBreadcrumbsDefault from '@/components/breadcrumbs/elements-breadcrumbs-default';
import IconGlobe from '@/components/icon/icon-globe';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import DataTablePublicFormGroup from './data-table';

async function CampusPublicSurvey() {
  const session = await getServerAuthSession();
  const data = await api.campus.publicSurvey.getPublicSurvey({ campusId: session?.user.id ?? '' });

  return (
    <div>
      <div className="banner flex h-40 flex-wrap justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <img className="w-12 overflow-hidden rounded-full bg-white object-cover" src={session?.user.image ?? ''} alt="img" />
            <div className="justify-center-center flex flex-col gap-1">
              <h1 className="text-xl text-white">{session?.user.name}</h1>
              <ElementsBreadcrumbsDefault data={['Public', 'Survey']} />
            </div>
          </div>
        </div>
      </div>
      <div className="panel -mt-16">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <IconGlobe />
          <h1>Daftar Survey Publik</h1>
          <span className="badge bg-primary">Umum</span>
        </div>
        <DataTablePublicFormGroup data={data} />
      </div>
    </div>
  );
}

export default CampusPublicSurvey;
