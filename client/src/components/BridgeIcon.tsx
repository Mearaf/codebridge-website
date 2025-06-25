interface BridgeIconProps {
  className?: string;
  isBackground?: boolean;
}

export default function BridgeIcon({ className = "w-6 h-6", isBackground = false }: BridgeIconProps) {
  const opacity = isBackground ? "0.15" : "1";
  
  return (
    <svg 
      viewBox="0 0 200 40" 
      className={className}
      fill="currentColor"
      style={{ opacity }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Bridge foundations */}
      <rect x="10" y="28" width="4" height="10" />
      <rect x="35" y="25" width="4" height="13" />
      <rect x="60" y="20" width="5" height="18" />
      <rect x="95" y="18" width="5" height="20" />
      <rect x="130" y="20" width="5" height="18" />
      <rect x="155" y="25" width="4" height="13" />
      <rect x="180" y="28" width="4" height="10" />
      
      {/* Main bridge deck spanning full width */}
      <rect x="5" y="25" width="190" height="3" />
      
      {/* Central suspension tower */}
      <rect x="96" y="5" width="3" height="20" />
      
      {/* Suspension cables from central tower */}
      <line x1="97.5" y1="8" x2="70" y2="25" stroke="currentColor" strokeWidth="1" />
      <line x1="97.5" y1="8" x2="125" y2="25" stroke="currentColor" strokeWidth="1" />
      <line x1="97.5" y1="10" x2="80" y2="25" stroke="currentColor" strokeWidth="1" />
      <line x1="97.5" y1="10" x2="115" y2="25" stroke="currentColor" strokeWidth="1" />
      <line x1="97.5" y1="12" x2="85" y2="25" stroke="currentColor" strokeWidth="1" />
      <line x1="97.5" y1="12" x2="110" y2="25" stroke="currentColor" strokeWidth="1" />
      
      {/* Secondary towers */}
      <rect x="61" y="10" width="2" height="15" />
      <rect x="131" y="10" width="2" height="15" />
      
      {/* Secondary cables */}
      <line x1="62" y1="12" x2="50" y2="25" stroke="currentColor" strokeWidth="0.8" />
      <line x1="62" y1="12" x2="74" y2="25" stroke="currentColor" strokeWidth="0.8" />
      <line x1="132" y1="12" x2="120" y2="25" stroke="currentColor" strokeWidth="0.8" />
      <line x1="132" y1="12" x2="144" y2="25" stroke="currentColor" strokeWidth="0.8" />
      
      {/* Bridge archways for visual interest */}
      <path 
        d="M 15 25 Q 25 20 35 25" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
      />
      <path 
        d="M 40 25 Q 50 18 60 25" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
      />
      <path 
        d="M 135 25 Q 145 18 155 25" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
      />
      <path 
        d="M 160 25 Q 170 20 180 25" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1"
      />
      
      {/* Road surface details */}
      <rect x="20" y="26" width="15" height="0.5" opacity="0.6" />
      <rect x="45" y="26" width="15" height="0.5" opacity="0.6" />
      <rect x="70" y="26" width="15" height="0.5" opacity="0.6" />
      <rect x="105" y="26" width="15" height="0.5" opacity="0.6" />
      <rect x="130" y="26" width="15" height="0.5" opacity="0.6" />
      <rect x="155" y="26" width="15" height="0.5" opacity="0.6" />
    </svg>
  );
}