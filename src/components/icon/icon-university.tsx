import { type FC } from 'react';

interface IconUniversityProps {
  className?: string;
}

const IconUniversity: FC<IconUniversityProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17z" />
    </svg>
  );
};

export default IconUniversity;
