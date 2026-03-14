import React from "react";

export const ForgeSuitLogo = ({ className = "w-6 h-6 text-white" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Geometric stylized 'F' and 'S' forming a shield/forge element */}
    <path
      d="M12 2L4 6V13.5C4 18.2 7.5 22.4 12 24C16.5 22.4 20 18.2 20 13.5V6L12 2Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-40"
    />
    <path
      d="M12 22.51V12.5H20M12 2.5V12.5H4"
      stroke="url(#saas-gradient-glow)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="hidden" /* optional cool inner lines if wanted */
    />
    <path
      d="M9 10L12 7L18 13L15 16M11.5 14.5L9 17L6 14L8.5 11.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);
