import React from 'react';

const RedoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M3 13v-2a4 4 0 0 1 4-4h11" />
    <polyline points="17 3 21 7 17 11" />
  </svg>
);

export default RedoIcon;
