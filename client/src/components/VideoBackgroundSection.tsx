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
      console.log('Video can play:', videoSrc);
      setVideoLoaded(true);
      
      // Force play without promises for better compatibility
      try {
        video.currentTime = 0;
        video.play();
        console.log('Video playing successfully');
      } catch (error) {
        console.log('Video autoplay prevented:', error);
        setVideoLoaded(true); // Still show the video element
      }
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e, 'URL:', videoSrc);
      setVideoLoaded(false);
    };

    const handleLoadStart = () => {
      console.log('Video load started:', videoSrc);
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

      {/* Debug info */}
      <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs p-3 rounded-lg backdrop-blur-sm max-w-xs z-50">
        <div className="font-semibold mb-1">Video Debug</div>
        <div>Mode: {useVideo ? 'Video' : 'Image'}</div>
        <div>Loaded: {videoLoaded ? 'Yes' : 'No'}</div>
        <div>Source: {videoSrc ? 'Set' : 'None'}</div>
        <div>Opacity: {opacity}</div>
        <div className="text-xs mt-1 break-all">{videoSrc}</div>
        <button 
          onClick={() => {
            const video = videoRef.current;
            if (video) {
              video.load();
              setTimeout(() => video.play(), 100);
            }
          }}
          className="mt-2 px-2 py-1 bg-white/20 rounded text-xs"
        >
          Retry Video
        </button>
      </div>
    </section>
  );
}