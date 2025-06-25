import { useState, useEffect, useRef } from "react";
import { BarChart3, TrendingUp, Database, Cpu, Monitor, Wifi } from "lucide-react";

interface TechDashboardBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function TechDashboardBackground({ 
  children, 
  className = ""
}: TechDashboardBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Tech analytics icons for floating overlay
  const techIcons = [
    { Icon: BarChart3, position: { top: '15%', left: '10%' }, delay: 0 },
    { Icon: TrendingUp, position: { top: '25%', right: '15%' }, delay: 0.8 },
    { Icon: Database, position: { bottom: '30%', left: '8%' }, delay: 1.6 },
    { Icon: Cpu, position: { top: '40%', right: '10%' }, delay: 2.4 },
    { Icon: Monitor, position: { bottom: '20%', right: '20%' }, delay: 3.2 },
    { Icon: Wifi, position: { top: '60%', left: '15%' }, delay: 4 }
  ];

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedData = () => {
      console.log("Tech dashboard video loaded successfully");
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
      console.error("Tech dashboard video error:", e);
      setVideoError(true);
      setVideoLoaded(false);
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    // Use the high-tech financial dashboard video
    video.src = "https://www.shutterstock.com/shutterstock/videos/3666907189/preview/stock-footage-high-tech-financial-dashboard-with-data-visualizations-charts-and-global-analytics-illustrating.webm";
    
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
      {/* Tech Dashboard Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoLoaded ? 0.4 : 0,
            transition: 'opacity 2s ease-in-out',
            filter: 'brightness(0.5) contrast(1.2) grayscale(0.7)'
          }}
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        />
      )}

      {/* Fallback Pattern for Analytics Theme */}
      {videoError && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(0,0,0,0.02) 0%, 
                rgba(0,0,0,0.05) 50%, 
                rgba(0,0,0,0.02) 100%),
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 30px,
                rgba(0,0,0,0.01) 30px,
                rgba(0,0,0,0.01) 32px
              )
            `
          }}
        />
      )}

      {/* Tech Analytics Icons Overlay - Only show if video fails */}
      {videoError && (
        <div className="absolute inset-0">
          {techIcons.map(({ Icon, position, delay }, index) => (
            <div
              key={index}
              className="absolute animate-pulse"
              style={{
                ...position,
                animationDelay: `${delay}s`,
                animationDuration: '4s'
              }}
            >
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl border border-black/10 flex items-center justify-center hover:bg-white/25 transition-all duration-300 shadow-lg">
                <Icon className="w-6 h-6 text-black/70" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Data Grid Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
          opacity: 0.3
        }}
      />

      {/* Gradient Overlay for Text Readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at center, 
              rgba(255,255,255,0.85) 0%, 
              rgba(255,255,255,0.65) 40%,
              rgba(255,255,255,0.45) 70%,
              rgba(255,255,255,0.75) 100%)
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