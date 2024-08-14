import LoadingDotComponent from './loading-dot';

function LoadingModal() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center rounded-md bg-[black]/60">
        <div className="flex flex-col items-center rounded-lg bg-white px-8 py-5 shadow-md ring ring-gray-200 dark:bg-dark dark:ring-gray-600">
          <LoadingDotComponent position="center" />
          <div className="mt-2 text-center text-base font-medium dark:text-white">Sedang Mengambil Data</div>
        </div>
      </div>
    </>
  );
}

export default LoadingModal;
