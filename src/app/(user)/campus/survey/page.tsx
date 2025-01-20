import LoadingModal from '@/components/loading/loading-modal';
import { Suspense } from 'react';
import ListSurveyCampus from './list-survey-campus';

async function ListSurveyCampusPage() {
  return (
    <>
      <Suspense fallback={<LoadingModal />}>
        <ListSurveyCampus />;
      </Suspense>
    </>
  );
}

export default ListSurveyCampusPage;
