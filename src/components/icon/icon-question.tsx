import { type FC } from 'react';

interface IconQuestionProps {
  className?: string;
}

const IconQuestion: FC<IconQuestionProps> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className={className}>
      <path fill="currentColor" d="M15 11V4H4v8.17l.59-.58l.58-.59H6z" opacity="0.3" />
      <path fill="currentColor" d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1m-5 7c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4zM4.59 11.59l-.59.58V4h11v7H5.17z" />
    </svg>
  );
};

export default IconQuestion;
