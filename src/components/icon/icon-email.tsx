import { type FC } from 'react';

interface IconEmailProps {
  className?: string;
}

const IconEmail: FC<IconEmailProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" className={className} height="18" viewBox="0 0 24 24">
      <path fill="currentColor" d="m20 8l-8 5l-8-5v10h16zm0-2H4l8 4.99z" opacity="0.3" />
      <path fill="currentColor" d="M4 20h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2M20 6l-8 4.99L4 6zM4 8l8 5l8-5v10H4z" />
    </svg>
  );
};

export default IconEmail;
