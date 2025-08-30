import React from 'react';

const MilkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M8 2h8v4H8z"/>
        <path d="M6 6h12v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6z"/>
        <path d="M12 10.5c-1.5 0-3 1-3 2.5s1.5 2.5 3 2.5 3-1 3-2.5-1.5-2.5-3-2.5z"/>
        <path d="M12 15.5c-1.5 0-3 1-3 2.5s1.5 2.5 3 2.5 3-1 3-2.5-1.5-2.5-3-2.5z" opacity=".5"/>
    </svg>
);

export default MilkIcon;
