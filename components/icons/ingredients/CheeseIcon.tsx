import React from 'react';

const CheeseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21.35 11.12L4.65 2.77c-.6-.3-1.35.15-1.35.88v16.7c0 .73.75 1.18 1.35.88l16.7-8.35c.55-.27.55-1.09 0-1.36z"/>
        <circle cx="9" cy="9" r="1.5"/>
        <circle cx="15" cy="15" r="1"/>
        <circle cx="16" cy="7" r="1"/>
    </svg>
);

export default CheeseIcon;
