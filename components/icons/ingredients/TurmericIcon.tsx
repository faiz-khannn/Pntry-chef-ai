import React from 'react';

const TurmericIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity=".2" fill="currentColor"/>
        <path d="M15.41 16.59L14 18l-6-6 6-6 1.41 1.41L10.83 12z"/>
    </svg>
);

export default TurmericIcon;
