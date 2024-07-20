import { getServerAuthSession } from '@/server/auth';

async function CampusPage() {
  const session = await getServerAuthSession();

  return <div>CampusPage</div>;
}

export default CampusPage;
