import React from 'react';

const PaprikaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2c-3 3-5 9-5 12s2 7 5 7 5-4 5-12-2-9-5-12z"/>
        <path d="M12 2c3 3 5 9 5 12s-2 7-5 7-5-4-5-12 2-9 5-12z" transform="rotate(60 12 12)"/>
        <path d="M12 2c3 3 5 9 5 12s-2 7-5 7-5-4-5-12 2-9 5-12z" transform="rotate(120 12 12)"/>
    </svg>
);

export default PaprikaIcon;
