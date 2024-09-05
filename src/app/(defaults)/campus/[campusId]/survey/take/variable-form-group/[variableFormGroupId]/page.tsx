import IconTask from '@/components/icon/icon-task';
import { api } from '@/trpc/server';

async function CampusTakeSurvey({ params }: { params: { variableFormGroupId: string; campusId: string } }) {
  console.log('🚀 ~ CampusTakeSurvey ~ params:', params);
  const data = await api.campus.campusSurvey.getQuestionSurvey({ campusId: params.campusId, variableOnFormGroupId: params.variableFormGroupId });

  return (
    <div>
      <div className="banner flex h-24 flex-wrap justify-between gap-3">
        <IconTask className="h-10 w-10" />
        <h1 className="text-xl text-white">{'session?.user.name'}</h1>
        <IconTask className="h-10 w-10" />
      </div>
      <div className="panel">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <h1>asdas</h1>
          <span className="badge bg-primary">Kampus</span>
        </div>
        {/* <DataTableCampusFormGroup data={data} /> */}
      </div>
    </div>
  );
}

export default CampusTakeSurvey;
