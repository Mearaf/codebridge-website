import { useState, useEffect, useRef } from "react";
import { Users, Target, Heart, Lightbulb, Handshake, Award } from "lucide-react";

interface BusinessTeamBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function BusinessTeamBackground({ 
  children, 
  className = ""
}: BusinessTeamBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Team collaboration icons for floating overlay
  const teamIcons = [
    { Icon: Users, position: { top: '15%', left: '8%' }, delay: 0 },
    { Icon: Target, position: { top: '20%', right: '12%' }, delay: 1.2 },
    { Icon: Heart, position: { bottom: '25%', left: '10%' }, delay: 2.4 },
    { Icon: Lightbulb, position: { top: '45%', right: '8%' }, delay: 3.6 },
    { Icon: Handshake, position: { bottom: '15%', right: '15%' }, delay: 4.8 },
    { Icon: Award, position: { top: '65%', left: '12%' }, delay: 6 }
  ];

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedData = () => {
      console.log("Business team video loaded successfully");
      setVideoLoaded(true);
      setVideoError(false);
      
      video.muted = true;
      video.loop = true;
      video.currentTime = 0;
      
      setTimeout(() => {
        if (video.paused) {
          video.play().catch(err => {
            console.log("Autoplay blocked:", err);
          });
        }
      }, 100);
    };

    const handleError = (e: Event) => {
      console.error("Business team video error:", e);
      setVideoError(true);
      setVideoLoaded(false);
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    // Use the diverse business team collaboration video
    video.src = "https://www.shutterstock.com/shutterstock/videos/3713733661/preview/stock-footage-diverse-business-team-working-on-project-marketing-strategy-together-reviewing-statistic-data.webm";
    
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Business Team Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoLoaded ? 0.3 : 0,
            transition: 'opacity 2s ease-in-out',
            filter: 'brightness(0.7) contrast(1.1) grayscale(0.6)'
          }}
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        />
      )}

      {/* Fallback Pattern for Team Theme */}
      {videoError && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(0,0,0,0.02) 0%, 
                rgba(0,0,0,0.04) 50%, 
                rgba(0,0,0,0.02) 100%),
              radial-gradient(circle at 30% 70%, 
                rgba(0,0,0,0.01) 0%, 
                transparent 50%),
              radial-gradient(circle at 70% 30%, 
                rgba(0,0,0,0.01) 0%, 
                transparent 50%)
            `
          }}
        />
      )}

      {/* Team Collaboration Icons Overlay - Only show if video fails */}
      {videoError && (
        <div className="absolute inset-0">
          {teamIcons.map(({ Icon, position, delay }, index) => (
            <div
              key={index}
              className="absolute animate-pulse"
              style={{
                ...position,
                animationDelay: `${delay}s`,
                animationDuration: '5s'
              }}
            >
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full border border-black/10 flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg">
                <Icon className="w-7 h-7 text-black/60" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtle Collaboration Pattern */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0,0,0,0.01) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(0,0,0,0.01) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4
        }}
      />

      {/* Gradient Overlay for Text Readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              rgba(255,255,255,0.9) 0%, 
              rgba(255,255,255,0.75) 30%,
              rgba(255,255,255,0.6) 60%,
              rgba(255,255,255,0.8) 100%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}