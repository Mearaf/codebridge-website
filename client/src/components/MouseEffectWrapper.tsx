import { useEffect, useState } from 'react';

interface MouseEffectWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function MouseEffectWrapper({ 
  children, 
  className = '' 
}: MouseEffectWrapperProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Mouse-responsive overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(circle 200px at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.05) 0%, 
              transparent 70%)
          `,
          transition: 'background 0.1s ease-out'
        }}
      />
      
      {children}
    </div>
  );
}