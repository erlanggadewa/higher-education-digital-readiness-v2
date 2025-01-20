import LoadingModal from '@/components/loading/loading-modal';
import { Suspense } from 'react';
import CampusTakeSurvey from './campus-take-survey';

async function CampusTakeSurveyPage({ params }: { params: { variableFormGroupId: string } }) {
  return (
    <Suspense fallback={<LoadingModal />}>
      <CampusTakeSurvey
        params={{
          variableFormGroupId: params.variableFormGroupId,
        }}
      />
    </Suspense>
  );
}
export default CampusTakeSurveyPage;
