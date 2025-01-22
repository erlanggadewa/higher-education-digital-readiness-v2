import LoadingModal from '@/components/loading/loading-modal';
import { Suspense } from 'react';
import ListSurveyFormGroupCampus from './list-survey-form-group-campus';

async function ListSurveyFormGroupCampusPage({ params }: { params: { formGroupId: string } }) {
  return (
    <Suspense fallback={<LoadingModal />}>
      <ListSurveyFormGroupCampus
        params={{
          formGroupId: params.formGroupId,
        }}
      />
    </Suspense>
  );
}

export default ListSurveyFormGroupCampusPage;
