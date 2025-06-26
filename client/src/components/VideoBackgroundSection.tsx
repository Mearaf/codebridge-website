import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundSectionProps {
  children: React.ReactNode;
  className?: string;
  videoSrc?: string;
  imageSrc?: string;
  opacity?: number;
  useVideo?: boolean;
}

export default function VideoBackgroundSection({ 
  children,
  className = '',
  videoSrc = '',
  imageSrc = '',
  opacity = 0.3,
  useVideo = true
}: VideoBackgroundSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = e.currentTarget as Element;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useVideo) return;

    const handleCanPlay = () => {
      setVideoLoaded(true);
      
      // Let the browser handle autoplay naturally
      if (video.paused) {
        video.play().catch(() => {
          // Autoplay prevented, video will still be visible
        });
      }
    };

    const handleError = () => {
      setVideoLoaded(false);
    };

    const handleLoadStart = () => {
      // Video loading started
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [useVideo, videoSrc]);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Video Background */}
      {useVideo && videoSrc && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoLoaded ? opacity : 0,
            filter: 'blur(1px) brightness(0.7)',
            transform: `scale(1.1) translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
          }}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Image Background */}
      {!useVideo && imageSrc && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            opacity: opacity,
            filter: 'blur(0.5px) brightness(0.8)',
            transform: `scale(1.05) translate(${(mousePosition.x - 50) * 0.01}px, ${(mousePosition.y - 50) * 0.01}px)`
          }}
        />
      )}

      {/* Sophisticated overlay inspired by Mont-Fort */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.15) 0%, 
              transparent 40%),
            linear-gradient(135deg, 
              rgba(0,0,0,0.1) 0%, 
              rgba(0,0,0,0.05) 25%,
              transparent 50%,
              rgba(0,0,0,0.05) 75%,
              rgba(0,0,0,0.1) 100%),
            radial-gradient(ellipse at top, 
              rgba(255,255,255,0.1) 0%, 
              transparent 70%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>


    </section>
  );
}