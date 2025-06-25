import { useEffect, useRef, useState } from 'react';
import { useDynamicVideo } from '@/hooks/useDynamicVideo';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface DynamicVideoBackgroundProps {
  className?: string;
  showControls?: boolean;
  opacity?: number;
}

export default function DynamicVideoBackground({ 
  className = '', 
  showControls = false,
  opacity = 0.15 
}: DynamicVideoBackgroundProps) {
  const { currentVideo, isVideoActive, pauseVideo, resumeVideo, userBehavior } = useDynamicVideo();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentVideo || !isVideoActive) return;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      video.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Video autoplay prevented:', error);
      });
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Load the video
    video.src = currentVideo.src;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [currentVideo, isVideoActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoActive && videoLoaded) {
      video.play().catch(() => {
        // Autoplay failed, that's okay
      });
    } else {
      video.pause();
    }
  }, [isVideoActive, videoLoaded]);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      pauseVideo();
    } else {
      video.play();
      resumeVideo();
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Don't render if no video is selected
  if (!currentVideo || !isVideoActive) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: opacity,
          filter: 'blur(1px) brightness(0.8)',
          transform: 'scale(1.05)' // Slight scale to hide edges after blur
        }}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
      />

      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10"
        style={{ backdropFilter: 'blur(0.5px)' }}
      />

      {/* Video Controls (optional) */}
      {showControls && videoLoaded && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/50 rounded-lg p-2 backdrop-blur-sm">
          <Button
            size="sm"
            variant="ghost"
            onClick={handlePlayPause}
            className="text-white hover:bg-white/20 w-8 h-8 p-0"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleMuteToggle}
            className="text-white hover:bg-white/20 w-8 h-8 p-0"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </Button>
          
          {/* Video Info Tooltip */}
          <div className="hidden lg:block text-xs text-white/80 ml-2">
            {currentVideo.intensity} • {currentVideo.trigger}
          </div>
        </div>
      )}

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && showControls && (
        <div className="absolute top-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg backdrop-blur-sm max-w-xs">
          <div className="font-semibold mb-2">Video Behavior Debug</div>
          <div>Video: {currentVideo.id}</div>
          <div>Context: {currentVideo.context}</div>
          <div>Intensity: {currentVideo.intensity}</div>
          <div>Trigger: {currentVideo.trigger}</div>
          <div className="mt-2 pt-2 border-t border-white/20">
            <div>Time: {userBehavior.timeOnPage}s</div>
            <div>Scroll: {Math.round(userBehavior.scrollDepth)}%</div>
            <div>Interactions: {userBehavior.interactionCount}</div>
            <div>Idle: {userBehavior.idleTime}s</div>
          </div>
        </div>
      )}
    </div>
  );
}