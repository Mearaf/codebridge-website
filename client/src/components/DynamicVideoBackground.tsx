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
        // Fallback: show the video element anyway
        setVideoLoaded(true);
      });
    };

    const handleLoadStart = () => {
      console.log('Video loading started:', currentVideo.src);
    };

    const handleError = (e: Event) => {
      console.log('Video error:', e);
      setVideoLoaded(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Load the video
    video.src = currentVideo.src;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('error', handleError);
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

  // Show debug even when no video is active
  if (!currentVideo || !isVideoActive) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        {/* Always show debug info for troubleshooting */}
        <div className="absolute top-4 left-4 bg-red-800/80 text-white text-xs p-3 rounded-lg backdrop-blur-sm max-w-xs z-50">
          <div className="font-semibold mb-2">No Video Active</div>
          <div>Current Video: {currentVideo?.id || 'None'}</div>
          <div>Is Active: {isVideoActive ? 'Yes' : 'No'}</div>
          <div className="mt-2 pt-2 border-t border-white/20">
            <div>Time: {userBehavior.timeOnPage}s</div>
            <div>Scroll: {Math.round(userBehavior.scrollDepth)}%</div>
            <div>Interactions: {userBehavior.interactionCount}</div>
            <div>Idle: {userBehavior.idleTime}s</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ 
          opacity: opacity,
          filter: 'blur(0.5px) brightness(0.9)',
          transform: 'scale(1.02)', // Slight scale to hide edges
          zIndex: 1
        }}
        muted={isMuted}
        loop
        playsInline
        preload="auto"
        autoPlay
      />

      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20"
        style={{ backdropFilter: 'blur(0.5px)', zIndex: 2 }}
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

      {/* Debug Info (always visible for testing) */}
      <div className="absolute top-4 left-4 bg-black/80 text-white text-xs p-3 rounded-lg backdrop-blur-sm max-w-xs z-50">
        <div className="font-semibold mb-2">Video Debug</div>
        <div>Video: {currentVideo.id}</div>
        <div>Context: {currentVideo.context}</div>
        <div>Intensity: {currentVideo.intensity}</div>
        <div>Trigger: {currentVideo.trigger}</div>
        <div>Loaded: {videoLoaded ? 'Yes' : 'No'}</div>
        <div>Playing: {isPlaying ? 'Yes' : 'No'}</div>
        <div className="mt-2 pt-2 border-t border-white/20">
          <div>Time: {userBehavior.timeOnPage}s</div>
          <div>Scroll: {Math.round(userBehavior.scrollDepth)}%</div>
          <div>Interactions: {userBehavior.interactionCount}</div>
          <div>Idle: {userBehavior.idleTime}s</div>
        </div>
      </div>
    </div>
  );
}