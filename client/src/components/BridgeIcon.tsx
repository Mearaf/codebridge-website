interface BridgeIconProps {
  className?: string;
  isBackground?: boolean;
}

export default function BridgeIcon({ className = "w-6 h-6", isBackground = false }: BridgeIconProps) {
  const opacity = isBackground ? "0.08" : "1";
  
  return (
    <svg 
      viewBox="0 0 64 48" 
      className={className}
      fill="currentColor"
      style={{ opacity }}
    >
      {/* Bridge pillars */}
      <rect x="12" y="16" width="3" height="20" />
      <rect x="30" y="14" width="3" height="22" />
      <rect x="48" y="16" width="3" height="20" />
      
      {/* Bridge deck */}
      <rect x="8" y="32" width="48" height="3" />
      
      {/* Cable stays from main tower */}
      <line x1="31.5" y1="14" x2="20" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="31.5" y1="14" x2="43" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="31.5" y1="16" x2="24" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="31.5" y1="16" x2="39" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="31.5" y1="18" x2="27" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="31.5" y1="18" x2="36" y2="32" stroke="currentColor" strokeWidth="1" />
      
      {/* Bridge foundation arches */}
      <path 
        d="M 8 32 Q 20 26 32 32 Q 44 26 56 32" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5"
      />
      
      {/* Road markings */}
      <rect x="16" y="33" width="8" height="0.5" opacity="0.6" />
      <rect x="28" y="33" width="8" height="0.5" opacity="0.6" />
      <rect x="40" y="33" width="8" height="0.5" opacity="0.6" />
    </svg>
  );
}