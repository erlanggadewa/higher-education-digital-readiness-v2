import IconTask from '@/components/icon/icon-task';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import BackButton from './back-button';
import FormSurvey from './form-survey';

async function CampusTakeSurvey({ params }: { params: { variableFormGroupId: string } }) {
  const session = await getServerAuthSession();
  const data = await api.campus.campusSurvey.getQuestionSurvey({ campusId: session?.user.id ?? '', variableOnFormGroupId: params.variableFormGroupId });

  return (
    <div>
      <div className="banner flex h-24 flex-wrap items-center justify-between gap-3">
        <BackButton />
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-xl text-white">{data?.formGroup.name}</h1>
          <span className="badge bg-white text-black">{data?.variable.alias}</span>
        </div>
        <IconTask className="h-10 w-10 text-white" />
      </div>
      <div className="">
        <FormSurvey data={data} />
      </div>
    </div>
  );
}
export default CampusTakeSurvey;
