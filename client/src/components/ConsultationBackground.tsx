import React from 'react';

interface ConsultationBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function ConsultationBackground({ 
  children, 
  className = "" 
}: ConsultationBackgroundProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}