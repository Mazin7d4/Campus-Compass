import React from 'react';

type LogoProps = {
  id: string;
  className?: string;
};

const CsusLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="CSUS logo"
  >
    <path
      d="M68.75 25C68.75 18.3333 62.9167 12.5 54.5833 12.5H25V37.5H41.6667C50 37.5 52.0833 41.6667 52.0833 45.8333V54.1667C52.0833 58.3333 50 62.5 41.6667 62.5H25V87.5H54.5833C62.9167 87.5 68.75 81.6667 68.75 75V25Z"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SjsuLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="SJSU logo"
  >
    <path
      d="M37.5 87.5V43.75C37.5 33.3333 25 25 25 25M62.5 12.5V56.25C62.5 66.6667 75 75 75 75"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CsuebLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="CSUEB logo"
  >
    <path
      d="M75 12.5H25V87.5H75M25 50H62.5"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Generic compass logo used as fallback for campuses without a custom logo
const DefaultLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Campus logo"
  >
    <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="8" />
    <path
      d="M50 20L56 44H50H44L50 20Z"
      fill="currentColor"
    />
    <path
      d="M50 80L44 56H50H56L50 80Z"
      fill="currentColor"
      opacity="0.5"
    />
    <path
      d="M20 50L44 44V50V56L20 50Z"
      fill="currentColor"
      opacity="0.5"
    />
    <path
      d="M80 50L56 56V50V44L80 50Z"
      fill="currentColor"
    />
  </svg>
);

const logos: { [key: string]: React.FC<{ className?: string }> } = {
  csus: CsusLogo,
  sjsu: SjsuLogo,
  csueb: CsuebLogo,
};

export const CampusLogo = ({ id, className }: LogoProps) => {
  const LogoComponent = logos[id] || DefaultLogo;
  return <LogoComponent className={className} />;
};
