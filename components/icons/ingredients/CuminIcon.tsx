import React from 'react';

const CuminIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="2" />
        <circle cx="6" cy="6" r="1.5" />
        <circle cx="18" cy="6" r="1.5" />
        <circle cx="6" cy="18" r="1.5" />
        <circle cx="18" cy="18" r="1.5" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
        <circle cx="5" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
    </svg>
);

export default CuminIcon;
