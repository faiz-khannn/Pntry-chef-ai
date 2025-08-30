import React from 'react';

const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 13v-2a4 4 0 0 0-4-4H8" />
    <polyline points="7 11 3 7 7 3" />
  </svg>
);

export default UndoIcon;
