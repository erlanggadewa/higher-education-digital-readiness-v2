import { type FC } from 'react';

interface IconLevelProps {
  className?: string;
}

const IconLevel: FC<IconLevelProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" className={className}>
      <path fill="currentColor" d="M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z" />
    </svg>
  );
};

export default IconLevel;
