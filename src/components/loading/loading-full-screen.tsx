import LoadingDotComponent from './loading-dot';

function LoadingFullScreen() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[60] grid place-content-center rounded-md bg-opacity-10 shadow-lg backdrop-blur-lg backdrop-filter">
      <LoadingDotComponent position="center" widthAndHeightClass="h-6 w-6" />
    </div>
  );
}

export default LoadingFullScreen;
