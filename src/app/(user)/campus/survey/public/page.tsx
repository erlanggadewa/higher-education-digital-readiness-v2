import LoadingModal from '@/components/loading/loading-modal';
import { Suspense } from 'react';
import CampusPublicSurvey from './campus-public-survey';

async function CampusPublicSurveyPage() {
  return (
    <Suspense fallback={<LoadingModal />}>
      <CampusPublicSurvey />;
    </Suspense>
  );
}

export default CampusPublicSurveyPage;
