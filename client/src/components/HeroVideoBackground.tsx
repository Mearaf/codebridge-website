import { useEffect, useRef, useState } from 'react';

interface HeroVideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
  opacity?: number;
}

export default function HeroVideoBackground({ 
  children,
  className = '',
  opacity = 0.3
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        console.log('Autoplay prevented, video ready');
      });
    };

    const handleError = () => {
      console.log('Video failed to load');
      setVideoLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: videoLoaded ? opacity : 0,
          filter: 'blur(0.5px) brightness(0.8)',
          transform: `scale(1.05) translate(${(mousePosition.x - 50) * 0.01}px, ${(mousePosition.y - 50) * 0.01}px)`
        }}
        muted
        loop
        playsInline
        preload="auto"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
      />

      {/* Fallback image if video fails */}
      {!videoLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            opacity: 0.15
          }}
        />
      )}

      {/* Mouse-responsive overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.08) 0%, 
              transparent 50%),
            linear-gradient(135deg, 
              rgba(0,0,0,0.1) 0%, 
              transparent 60%,
              rgba(0,0,0,0.05) 100%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Simple debug indicator */}
      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {videoLoaded ? '🎥 Video' : '📷 Fallback'}
      </div>
    </section>
  );
}