import LoadingDotComponent from './loading-dot';

function LoadingModal() {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center rounded-md bg-gradient-to-r from-white/40 to-white/10 shadow-lg backdrop-blur-md dark:from-gray-800/40 dark:to-gray-900/10 lg:left-[260px]">
        <div className="flex flex-col items-center rounded-lg bg-white px-8 py-5 shadow-md ring ring-gray-200 dark:bg-dark dark:ring-gray-600">
          <LoadingDotComponent position="center" widthAndHeightClass="w-6 h-6" />
          <div className="mt-2 text-center text-lg font-semibold dark:text-white">Sedang Mengambil Data</div>
        </div>
      </div>
    </>
  );
}

export default LoadingModal;
