import { type FC } from 'react';

interface IconArrowLeftProps {
    className?: string;
}

const IconArrowLeft: FC<IconArrowLeftProps> = ({ className }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M20 12H4m0 0l6-6m-6 6l6 6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default IconArrowLeft;
