import React from 'react';

const BellPepperIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2C8.69 2 6 4.69 6 8v3c0 2.21 1.79 4 4 4h4c2.21 0 4-1.79 4-4V8c0-3.31-2.69-6-6-6z"/>
        <path d="M12 2v4"/>
        <path d="M18 11.97c-1.42 2.1-3.58 3.53-6 4.03-2.42-.5-4.58-1.93-6-4.03"/>
        <path d="M6 12v6c0 1.66 1.34 3 3 3h6c1.66 0 3-1.34 3-3v-6"/>
    </svg>
);

export default BellPepperIcon;
