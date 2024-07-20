import { type FC } from 'react';

interface IconArrowForwardProps {
    className?: string;
}

const IconArrowForward: FC<IconArrowForwardProps> = ({ className }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M14.5 7L19.5 12L14.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.5" d="M19.5 12L9.5 12C7.83333 12 4.5 13 4.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
};

export default IconArrowForward;
