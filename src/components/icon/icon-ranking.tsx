import { type FC } from 'react';

interface IconRankingProps {
  className?: string;
  fill?: boolean;
}

const IconRanking: FC<IconRankingProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" className={className}>
      <path
        fill="currentColor"
        d="M240 200h-8v-56a16 16 0 0 0-16-16h-40V56a16 16 0 0 0-16-16H96a16 16 0 0 0-16 16v32H40a16 16 0 0 0-16 16v96h-8a8 8 0 0 0 0 16h224a8 8 0 0 0 0-16m-160 0H40v-96h40Zm60-64a8 8 0 0 1-16 0v-28.9l-1.47.49a8 8 0 0 1-5.06-15.18l12-4A8 8 0 0 1 140 96Zm76 64h-40v-56h40Z"
      />
    </svg>
  );
};
export default IconRanking;
