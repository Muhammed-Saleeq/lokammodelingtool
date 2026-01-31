interface LokamLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function LokamLogo({ className = "", variant = 'dark' }: LokamLogoProps) {
  const textColor = variant === 'light' ? '#ffffff' : '#1a1a2e';
  
  return (
    <svg 
      viewBox="0 0 120 32" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wave icon */}
      <path 
        d="M4 20C6 16 10 12 14 16C18 20 22 16 24 12" 
        stroke={textColor} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        fill="none"
      />
      <path 
        d="M4 14C6 10 10 6 14 10C18 14 22 10 24 6" 
        stroke={textColor} 
        strokeWidth="2.5" 
        strokeLinecap="round"
        fill="none"
      />
      {/* Text "lokam" */}
      <text 
        x="32" 
        y="22" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize="18" 
        fontWeight="600" 
        fill={textColor}
      >
        lokam
      </text>
    </svg>
  );
}
