import { type FC } from 'react';

interface IconNameProps {
  className?: string;
}

const IconName: FC<IconNameProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" className={className} height="18" viewBox="0 0 48 48">
      <defs>
        <mask id="ipTEditName0">
          <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
            <circle cx="24" cy="11" r="7" fill="#555" />
            <path d="M4 41c0-8.837 8.059-16 18-16" />
            <path fill="#555" d="m31 42l10-10l-4-4l-10 10v4z" />
          </g>
        </mask>
      </defs>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTEditName0)" />
    </svg>
  );
};

export default IconName;
