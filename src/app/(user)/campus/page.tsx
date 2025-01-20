import LoadingModal from '@/components/loading/loading-modal';
import { Suspense } from 'react';
import Campus from './campus';

async function CampusPage() {
  return (
    <Suspense fallback={<LoadingModal />}>
      <Campus />
    </Suspense>
  );
}

export default CampusPage;
