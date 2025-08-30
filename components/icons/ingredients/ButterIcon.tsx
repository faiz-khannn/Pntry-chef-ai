import React from 'react';

const ButterIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 14h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z"/>
        <path d="M3.5 10h17c.83 0 1.5.67 1.5 1.5v1c0 .83-.67 1.5-1.5 1.5h-17c-.83 0-1.5-.67-1.5-1.5v-1c0-.83.67-1.5 1.5-1.5z"/>
        <path d="M5 6h10v4H5z"/>
        <path d="M15 6L19 4v6l-4-2z"/>
    </svg>
);

export default ButterIcon;
