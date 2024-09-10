import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import FormSurvey from './form-survey';

async function CampusTakeSurvey({ params }: { params: { variableFormGroupId: string } }) {
  const session = await getServerAuthSession();
  const data = await api.campus.campusSurvey.getQuestionSurvey({ campusId: session?.user.id ?? '', variableOnFormGroupId: params.variableFormGroupId });

  return <FormSurvey data={data} />;
}
export default CampusTakeSurvey;
