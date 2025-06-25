interface BridgeIconProps {
  className?: string;
}

export default function BridgeIcon({ className = "w-6 h-6" }: BridgeIconProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      className={className}
      fill="currentColor"
    >
      {/* Bridge pillars */}
      <rect x="8" y="20" width="2" height="16" />
      <rect x="22" y="18" width="2" height="18" />
      <rect x="36" y="20" width="2" height="16" />
      
      {/* Bridge deck */}
      <rect x="6" y="32" width="36" height="2" />
      
      {/* Cable stays */}
      <line x1="23" y1="18" x2="15" y2="32" stroke="currentColor" strokeWidth="0.5" />
      <line x1="23" y1="18" x2="31" y2="32" stroke="currentColor" strokeWidth="0.5" />
      <line x1="23" y1="20" x2="19" y2="32" stroke="currentColor" strokeWidth="0.5" />
      <line x1="23" y1="20" x2="27" y2="32" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Bridge arches */}
      <path 
        d="M 6 32 Q 16 28 24 32 Q 32 28 42 32" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
      />
    </svg>
  );
}