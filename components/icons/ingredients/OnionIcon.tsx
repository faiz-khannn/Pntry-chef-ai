import React from 'react';

const OnionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 21.35c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        <path d="M12 21.35V4.65"/>
        <path d="M18.36 15.36c-2.34-2.34-6.36-2.34-8.72 0"/>
        <path d="M16.24 13.24c-1.56-1.56-4.24-1.56-5.8 0"/>
        <path d="M14.12 11.12c-.78-.78-2.12-.78-2.9 0"/>
        <path d="M13 3.5L11 2 9 3.5"/>
    </svg>
);

export default OnionIcon;
