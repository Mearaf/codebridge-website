import { useState, useEffect, useRef } from "react";
import MouseEffectWrapper from "./MouseEffectWrapper";

interface TechOverlayBackgroundProps {
  children: React.ReactNode;
  className?: string;
  videoSrc?: string;
  imageSrc?: string;
  opacity?: number;
}

export default function TechOverlayBackground({ 
  children, 
  className = "",
  videoSrc,
  imageSrc,
  opacity = 0.1
}: TechOverlayBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedData = () => {
      console.log("Bridge video loaded successfully:", video.src);
      setVideoLoaded(true);
      setVideoError(false);
      
      video.muted = true;
      video.loop = true;
      video.currentTime = 0;
      
      setTimeout(() => {
        if (video.paused) {
          video.play().catch(err => {
            console.log("Autoplay blocked, video will be visible but paused:", err);
          });
        }
      }, 100);
    };

    const handleError = (e: Event) => {
      console.error("Bridge video error:", e);
      setVideoError(true);
      setVideoLoaded(false);
    };

    const handleCanPlay = () => {
      console.log("Bridge video can play:", video.src);
      setVideoLoaded(true);
    };

    video.src = videoSrc;
    
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSrc]);

  return (
    <MouseEffectWrapper className={`relative overflow-hidden ${className}`}>
      {/* Bridge Video Background */}
      {videoSrc && !videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoLoaded ? opacity : 0,
            transition: 'opacity 1.5s ease-in-out',
            filter: 'brightness(0.3) contrast(1.2) grayscale(0.8)'
          }}
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        />
      )}

      {/* Tech Pattern Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(0,0,0,0.1) 0%, transparent 30%),
            radial-gradient(circle at 80% 20%, rgba(0,0,0,0.1) 0%, transparent 30%),
            linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.05) 49%, rgba(0,0,0,0.05) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(0,0,0,0.05) 49%, rgba(0,0,0,0.05) 51%, transparent 52%)
          `,
          backgroundSize: '400px 400px, 300px 300px, 20px 20px, 20px 20px',
          backgroundPosition: '0 0, 100% 100%, 0 0, 0 0',
          opacity: 0.6
        }}
      />

      {/* Tech Circuit Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.03) 2px,
              rgba(0,0,0,0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.03) 2px,
              rgba(0,0,0,0.03) 4px
            )
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4
        }}
      />

      {/* Image Fallback */}
      {(videoError || !videoSrc) && imageSrc && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            opacity: opacity,
            transition: 'opacity 1s ease-in-out',
            filter: 'brightness(0.4) contrast(1.1) grayscale(0.7)'
          }}
        />
      )}

      {/* Gradient Overlay for Text Readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255,255,255,0.9) 0%, 
              rgba(255,255,255,0.7) 30%,
              rgba(255,255,255,0.5) 60%,
              rgba(255,255,255,0.8) 100%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </MouseEffectWrapper>
  );
}