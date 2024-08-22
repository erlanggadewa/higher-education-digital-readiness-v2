import BreadCrumb from '@/components/elements/breadcrumb';

const AdminPage = () => {
  return (
    <div>
      <div className="absolute left-0 top-0 z-[-10] h-36 w-full bg-primary" />
      <div className="flex justify-between">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-white-light">Dashboard</h1>
          <BreadCrumb routes={[{ label: 'Dashboard' }]} />
        </div>
        <div>
          <button type="button" className="btn bg-white dark:text-[#3b3f5c]">
            Respon Pertanyaan
          </button>
        </div>
      </div>
      <div className="mb-5 w-full rounded-md border border-white-light bg-white p-5 shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
        <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">Selamat datang, Admin</h5>
      </div>
    </div>
  );
};

export default AdminPage;
