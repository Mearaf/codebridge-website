import { useEffect, useRef, useState } from 'react';

interface SimpleVideoBackgroundProps {
  className?: string;
  opacity?: number;
}

export default function SimpleVideoBackground({ 
  className = '', 
  opacity = 0.3 
}: SimpleVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
      video.play().catch(() => {
        console.log('Autoplay failed, that\'s okay');
      });
    };

    video.addEventListener('loadeddata', handleLoadedData);
    return () => video.removeEventListener('loadeddata', handleLoadedData);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: isLoaded ? opacity : 0,
          filter: 'blur(1px) brightness(0.8)',
          transform: 'scale(1.05)'
        }}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />
      
      {/* Debug Info */}
      <div className="absolute top-4 right-4 bg-green-800/80 text-white text-xs p-2 rounded backdrop-blur-sm">
        Video: {isLoaded ? 'Loaded' : 'Loading...'}
      </div>
    </div>
  );
}