import { type FC } from 'react';

interface IconInfoCircleProps {
  className?: string;
  fill?: boolean;
}

const IconInfoCircle: FC<IconInfoCircleProps> = ({ className }) => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z" />
      </svg>
    </>
  );
};
export default IconInfoCircle;
