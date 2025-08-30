import React from 'react';

const ChickenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M18.94 6.21C18.23 4.29 16.29 3 14 3c-1.5 0-2.82.7-3.66 1.82M3 13.01l.92-5.46c.15-1.03.88-1.83 1.9-2.06 2.53-.56 5.1-.46 7.2.47M21 16.01h-5.73c-2.34 0-4.25 1.91-4.25 4.25v0c0 .97.79 1.75 1.75 1.75h10.49c.97 0 1.75-.78 1.75-1.75v0c0-2.34-1.91-4.25-4.25-4.25z"/>
        <path d="M2.75 13.25c-.41 1.62.83 3.16 2.5 3.5.42.08.86.13 1.32.13 1.05 0 2.05-.33 2.87-.93"/>
        <path d="M12.91 21.25c.82.6 1.82.93 2.87.93 1.66 0 3.1-.84 3.5-2.5"/>
    </svg>
);

export default ChickenIcon;
