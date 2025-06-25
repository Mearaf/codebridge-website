import { useEffect, useRef, useState } from 'react';

interface TechVideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
  opacity?: number;
}

export default function TechVideoBackground({ 
  children,
  className = '',
  opacity = 0.3
}: TechVideoBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [currentVideo, setCurrentVideo] = useState(0);

  // Technology-themed videos from reliable sources
  const videos = [
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  ];

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
    <section className={`relative overflow-hidden ${className}`}>
      {/* CSS-based animated background */}
      <div className="absolute inset-0 w-full h-full">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900/10 via-gray-800/5 to-gray-900/10"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.02) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(0,0,0,0.02) 50%, transparent 70%),
              radial-gradient(circle at 25% 25%, rgba(0,0,0,0.01) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0,0,0,0.01) 0%, transparent 50%)
            `,
            backgroundSize: '60px 60px, 60px 60px, 200px 200px, 200px 200px',
            animation: 'techPattern 20s linear infinite'
          }}
        />
        
        {/* Technology pattern overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='m0 40v-40h40v40zm20-30h-20v20h20zm0 0v20h20v-20z'/%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3
          }}
        />
      </div>

      {/* Fallback professional image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
          opacity: 0.08
        }}
      />

      {/* Mouse-responsive overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.08) 0%, 
              transparent 50%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes techPattern {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-10px) translateY(-10px); }
          50% { transform: translateX(-20px) translateY(0); }
          75% { transform: translateX(-10px) translateY(10px); }
          100% { transform: translateX(0) translateY(0); }
        }
      `}</style>
    </section>
  );
}