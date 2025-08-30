import React from 'react';

const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"></path>
  </svg>
);

export default BookOpenIcon;
