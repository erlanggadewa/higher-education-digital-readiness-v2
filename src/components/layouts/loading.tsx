import LoadingDotComponent from '../loading/loading-dot';

const Loading = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[60] grid place-content-center rounded-md bg-[black]/60 dark:bg-dark lg:left-[260px]">
      <LoadingDotComponent position="center" widthAndHeightClass="h-6 w-6" />
    </div>
  );
};

export default Loading;
