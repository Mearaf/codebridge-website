import { useEffect, useRef, useState } from 'react';

interface ReliableVideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
  opacity?: number;
}

export default function ReliableVideoBackground({ 
  children,
  className = '',
  opacity = 0.3
}: ReliableVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Try multiple reliable video sources
  const videoSources = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://sample-videos.com/zip/10/mp4/480/SampleVideo_1280x720_1mb.mp4",
    "https://file-examples.com/storage/fe86a1b1e2bb0292e45b1b1/2017/10/file_example_MP4_480_1_5MG.mp4"
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let currentSourceIndex = 0;

    const tryNextSource = () => {
      if (currentSourceIndex < videoSources.length) {
        video.src = videoSources[currentSourceIndex];
        video.load();
        currentSourceIndex++;
      }
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        console.log('Video ready but autoplay prevented');
      });
    };

    const handleError = () => {
      console.log(`Video source ${currentSourceIndex} failed, trying next...`);
      tryNextSource();
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    // Start with first source
    tryNextSource();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
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
          filter: 'blur(0.5px) brightness(0.9)',
          transform: `scale(1.02) translate(${(mousePosition.x - 50) * 0.005}px, ${(mousePosition.y - 50) * 0.005}px)`
        }}
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Professional fallback image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80)',
          opacity: videoLoaded ? 0 : 0.12
        }}
      />

      {/* Tech pattern overlay when no video */}
      {!videoLoaded && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(0,0,0,0.02) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(0,0,0,0.02) 50%, transparent 70%)
            `,
            backgroundSize: '60px 60px, 60px 60px',
            animation: 'techPattern 20s linear infinite'
          }}
        />
      )}

      {/* Mouse-responsive overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.06) 0%, 
              transparent 50%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
        {videoLoaded ? '🎥 Video Active' : '🎨 Pattern Mode'}
      </div>
    </section>
  );
}