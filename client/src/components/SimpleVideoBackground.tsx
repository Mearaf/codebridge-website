import { useState, useEffect, useRef } from "react";
import MouseEffectWrapper from "./MouseEffectWrapper";

interface SimpleVideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
  videoSrc?: string;
  imageSrc?: string;
  opacity?: number;
}

export default function SimpleVideoBackground({ 
  children, 
  className = "",
  videoSrc,
  imageSrc,
  opacity = 0.1
}: SimpleVideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Alternative video sources for fallback
  const fallbackVideos = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4"
  ];

  useEffect(() => {
    if (!videoSrc || !videoRef.current) return;

    const video = videoRef.current;
    let currentSourceIndex = 0;

    const tryNextSource = () => {
      if (currentSourceIndex < fallbackVideos.length) {
        console.log(`Trying fallback video ${currentSourceIndex + 1}:`, fallbackVideos[currentSourceIndex]);
        video.src = fallbackVideos[currentSourceIndex];
        currentSourceIndex++;
      } else {
        console.log("All video sources failed, using image fallback");
        setVideoError(true);
        setVideoLoaded(false);
      }
    };

    const handleLoadedData = () => {
      console.log("Video loaded successfully:", video.src);
      setVideoLoaded(true);
      setVideoError(false);
      
      // Start playing without promises to avoid interruption
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
      console.error("Video error for source:", video.src, e);
      setVideoLoaded(false);
      tryNextSource();
    };

    const handleCanPlay = () => {
      console.log("Video can play:", video.src);
      setVideoLoaded(true);
    };

    // Set initial source
    video.src = videoSrc;
    
    // Add event listeners
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
      {/* Video Background */}
      {videoSrc && !videoError && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            opacity: videoLoaded ? opacity : 0,
            transition: 'opacity 1s ease-in-out'
          }}
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
        />
      )}

      {/* Image Fallback */}
      {(videoError || !videoSrc) && imageSrc && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            opacity: opacity,
            transition: 'opacity 1s ease-in-out'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </MouseEffectWrapper>
  );
}