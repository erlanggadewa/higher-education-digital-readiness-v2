import { cn } from '@/utils/cn';

function LoadingDotComponent({ widthAndHeightClass, position }: { widthAndHeightClass?: string; position: 'center' | 'start' | 'end' }) {
  return (
    <div className={cn('loading-screen', `justify-${position}`)} id="dot-loading-wrapper">
      <div className={cn('dot h-full w-full', widthAndHeightClass ?? 'h-4 w-4')}></div>
      <div className={cn('dot h-full w-full', widthAndHeightClass ?? 'h-4 w-4')}></div>
      <div className={cn('dot h-full w-full', widthAndHeightClass ?? 'h-4 w-4')}></div>
      <div className={cn('dot h-full w-full', widthAndHeightClass ?? 'h-4 w-4')}></div>
      <div className={cn('dot h-full w-full', widthAndHeightClass ?? `h-4 w-4`)}></div>
    </div>
  );
}

export default LoadingDotComponent;
