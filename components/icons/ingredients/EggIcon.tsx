import React from 'react';

const EggIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 12c-3.314 0-6-2.239-6-5s2.686-5 6-5 6 2.239 6 5-2.686 5-6 5z" fill="#FFC107" stroke="none"/>
    </svg>
);

export default EggIcon;
