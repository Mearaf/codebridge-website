import { useState, useEffect, useRef } from "react";
import { Code, Wifi, Database, Cloud, Smartphone, Monitor, Cpu, Network } from "lucide-react";
import MouseEffectWrapper from "./MouseEffectWrapper";

interface BridgeWithTechOverlayProps {
  children: React.ReactNode;
  className?: string;
}

export default function BridgeWithTechOverlay({ 
  children, 
  className = ""
}: BridgeWithTechOverlayProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Tech icons for floating overlay
  const techIcons = [
    { Icon: Code, position: { top: '20%', left: '15%' }, delay: 0 },
    { Icon: Wifi, position: { top: '30%', right: '20%' }, delay: 0.5 },
    { Icon: Database, position: { bottom: '25%', left: '10%' }, delay: 1 },
    { Icon: Cloud, position: { top: '15%', right: '10%' }, delay: 1.5 },
    { Icon: Smartphone, position: { bottom: '20%', right: '15%' }, delay: 2 },
    { Icon: Monitor, position: { top: '40%', left: '25%' }, delay: 2.5 },
    { Icon: Cpu, position: { bottom: '35%', left: '30%' }, delay: 3 },
    { Icon: Network, position: { top: '25%', right: '30%' }, delay: 3.5 }
  ];

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedData = () => {
      console.log("Bridge video loaded successfully");
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
      console.error("Bridge video error:", e);
      setVideoError(true);
      setVideoLoaded(false);
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    // Try different bridge video sources
    const bridgeVideos = [
      "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
    ];
    
    video.src = bridgeVideos[0];
    
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
    <MouseEffectWrapper className={`relative overflow-hidden ${className}`}>
      {/* Bridge Video Background */}
      {!videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoLoaded ? 0.3 : 0,
            transition: 'opacity 2s ease-in-out',
            filter: 'brightness(0.5) contrast(1.1) grayscale(1) blur(0.5px)'
          }}
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        />
      )}

      {/* Static Bridge Image Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`,
          filter: 'brightness(0.4) contrast(1.2) grayscale(1)',
          opacity: videoError ? 0.3 : 0.2
        }}
      />

      {/* Tech Icons Overlay */}
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
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl border border-black/10 flex items-center justify-center hover:bg-white/30 transition-all duration-300 shadow-lg">
              <Icon className="w-7 h-7 text-black/80" />
            </div>
          </div>
        ))}
      </div>

      {/* Circuit Pattern Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(0,0,0,0.02) 20px,
              rgba(0,0,0,0.02) 22px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(0,0,0,0.02) 20px,
              rgba(0,0,0,0.02) 22px
            )
          `,
          opacity: 0.5
        }}
      />

      {/* Digital Grid */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
          opacity: 0.4
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
    </MouseEffectWrapper>
  );
}