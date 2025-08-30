import React from 'react';

const TofuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <path d="M8 8h8v8H8z" fill="currentColor" opacity="0.1"/>
        <path d="M8 12h8M12 8v8"/>
    </svg>
);

export default TofuIcon;
