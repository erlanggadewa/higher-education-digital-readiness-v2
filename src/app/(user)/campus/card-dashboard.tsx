'use client';
import IconCertificate from '@/components/icon/icon-certificate';
import IconTask from '@/components/icon/icon-task';

function CardDashboardCampus() {
  return (
    <>
      <div className="panel flex max-h-28 items-center bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md dark:from-teal-800 dark:to-teal-700">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white p-2">
            <IconTask className="h-10 w-10 text-teal-700" />
          </div>
          <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
            <p>100</p>
            <p className="text-base">Survei Tersedia</p>
          </div>
        </div>
      </div>

      <div className="panel flex max-h-28 items-center bg-gradient-to-r from-sky-600 to-sky-500 text-white shadow-md dark:from-sky-800 dark:to-sky-700">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white p-2">
            <IconCertificate className="h-10 w-10 text-sky-700" />
          </div>
          <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
            <p>100</p>
            <p className="text-base">Sertifikat</p>
          </div>
        </div>
      </div>

      <div className="panel flex max-h-28 items-center bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md dark:from-amber-800 dark:to-amber-700">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white p-2">
            <IconCertificate className="h-10 w-10 text-amber-700" />
          </div>
          <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
            <p>100</p>
            <p className="text-base">Sertifikat</p>
          </div>
        </div>
      </div>

      <div className="panel flex max-h-28 items-center bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md dark:from-pink-800 dark:to-pink-700">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-white p-2">
            <IconCertificate className="h-10 w-10 text-pink-700" />
          </div>
          <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">
            <p>100</p>
            <p className="text-base">Sertifikat</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDashboardCampus;
