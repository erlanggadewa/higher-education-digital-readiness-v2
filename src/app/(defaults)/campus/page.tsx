import ElementsBreadcrumbsDefault from '@/components/breadcrumbs/elements-breadcrumbs-default';
import IconUniversity from '@/components/icon/icon-university';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';
import CardDashboardCampus from './card-dashboard';

async function CampusPage() {
  const session = await getServerAuthSession();
  const data = await api.campus.dashboard.getDashboard({ campusId: String(session?.user.id) });
  console.log('🚀 ~ CampusPage ~ data:', data);
  return (
    <>
      <div>
        <div className="banner flex h-36 flex-wrap justify-between gap-3">
          <div>
            <h1 className="text-xl text-white">Dashboard</h1>
            <ElementsBreadcrumbsDefault data={['Campus', 'Dashboard']} />
          </div>
        </div>
        <div className="panel -mt-12">
          <div className="flex items-center gap-3 text-base font-bold md:text-lg">
            <IconUniversity />
            <h1>Selamat Datang {session?.user.name}</h1>
          </div>
        </div>
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <CardDashboardCampus />
          </div>
          <div className="panel col-span-3 mt-6">
            <div className="rounded-lg p-4">
              <div className="mb-8 flex flex-col items-center justify-center">
                <img
                  src={data.campus.campusUser?.image ?? '/assets/images/hedr.png'} // Use a similar logo URL
                  alt="Logo Kampus"
                  className="mb-6 w-20 rounded-xl md:w-40"
                />
                <div>
                  <h2 className="text-xl font-bold md:text-3xl">{data.campus.campusUser?.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Belum ada peringkat. <span className="text-red-600 underline">Selesaikan survey!</span>
                  </p>
                </div>
              </div>
              <div className="grid gap-x-14 gap-y-7 sm:grid-cols-2">
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Nama Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.campusUser?.name}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Kode Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.codePt}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Email Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.campusUser?.email}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Status Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.statusPt ? 'Aktif' : 'Nonaktif'}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Tanggal Berdiri Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.standingDate?.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Akreditasi Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.accreditationPt}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">No. Telepon Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">No. SK PT Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.numberSkPt}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Kode Pos Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.postalCode}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Tanggal SK PT Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.dateSkPt?.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Alamat Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.address}</p>
                </div>
                <div>
                  <p className="text-base font-bold text-gray-600 dark:text-gray-400 md:text-lg">Kota Kampus</p>
                  <p className="text-base font-bold md:text-lg">{data.campus.city}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CampusPage;
