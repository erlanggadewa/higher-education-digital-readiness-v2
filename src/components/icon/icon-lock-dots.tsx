import { type FC } from 'react';

interface IconLockDotsProps {
  className?: string;
  fill?: boolean;
}

const IconLockDots: FC<IconLockDotsProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16c0 2.828 0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16"
        opacity={0.5}
      ></path>
      <path
        fill="currentColor"
        d="M12.75 14a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zm-6-6a5.25 5.25 0 0 1 10.5 0v2.004c.567.005 1.064.018 1.5.05V8a6.75 6.75 0 0 0-13.5 0v2.055a23.57 23.57 0 0 1 1.5-.051z"
      ></path>
    </svg>
  );
};
export default IconLockDots;
