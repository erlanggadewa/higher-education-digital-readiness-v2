import { getServerAuthSession } from '@/server/auth';

async function ListSurveyCampusPage() {
  const session = await getServerAuthSession();

  return <div>ListSurveyCampusPage</div>;
}

export default ListSurveyCampusPage;
