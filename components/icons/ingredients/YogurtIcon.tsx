import React from 'react';

const YogurtIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M5 7h14v12a2 2 0 01-2 2H7a2 2 0 01-2-2V7z"/>
        <path d="M5 7L7 3h10l2 4"/>
        <path d="M9.5 12c.67 0 1.25.5 1.25 1.25S10.17 14.5 9.5 14.5s-1.25-.5-1.25-1.25S8.83 12 9.5 12z"/>
        <path d="M14.5 14c.67 0 1.25.5 1.25 1.25s-.58 1.25-1.25 1.25-1.25-.5-1.25-1.25.58-1.25 1.25-1.25z"/>
    </svg>
);

export default YogurtIcon;
