import React from 'react';

const TomatoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 21.35c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="#E53E3E" stroke="none"/>
        <path d="M12 4.65c-4.42 0-8-3.58-8-8" transform="rotate(45 12 13)" />
        <path d="M14 3.5c1.5 1.5 1.5 4 0 5.5" />
        <path d="M10 3.5c-1.5 1.5-1.5 4 0 5.5" />
        <path d="M12 2v2" />
    </svg>
);

export default TomatoIcon;
