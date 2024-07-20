import { type FC } from 'react';

interface IconChecksProps {
  className?: string;
}

const IconChecks: FC<IconChecksProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22m2.474-13.581a.75.75 0 0 1 .107 1.055l-5.714 7a.75.75 0 0 1-1.162 0l-2.286-2.8a.75.75 0 0 1 1.162-.948l1.705 2.088l5.133-6.288a.75.75 0 0 1 1.055-.107m4 0a.75.75 0 0 1 .107 1.055l-5.714 7a.75.75 0 0 1-1.21-.064l-.285-.438a.75.75 0 0 1 .88-1.116l5.167-6.33a.75.75 0 0 1 1.055-.107"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconChecks;
