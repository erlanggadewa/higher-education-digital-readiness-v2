import { type FC } from 'react';

interface IconArchiveProps {
  className?: string;
}

const IconArchive: FC<IconArchiveProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className}>
      <path
        fill="currentColor"
        d="M2 5c0-.943 0-1.414.293-1.707C2.586 3 3.057 3 4 3h16c.943 0 1.414 0 1.707.293C22 3.586 22 4.057 22 5c0 .943 0 1.414-.293 1.707C21.414 7 20.943 7 20 7H4c-.943 0-1.414 0-1.707-.293C2 6.414 2 5.943 2 5"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M20.069 8.5c.141 0 .286 0 .431-.002V13c0 3.771 0 5.657-1.172 6.828C18.157 21 16.271 21 12.5 21h-1c-3.771 0-5.657 0-6.828-1.172C3.5 18.657 3.5 16.771 3.5 13V8.498c.145.002.29.002.431.002zM9 12c0-.466 0-.699.076-.883a1 1 0 0 1 .541-.541c.184-.076.417-.076.883-.076h3c.466 0 .699 0 .883.076a1 1 0 0 1 .54.541c.077.184.077.417.077.883s0 .699-.076.883a1 1 0 0 1-.541.54c-.184.077-.417.077-.883.077h-3c-.466 0-.699 0-.883-.076a1 1 0 0 1-.54-.541C9 12.699 9 12.466 9 12"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default IconArchive;
