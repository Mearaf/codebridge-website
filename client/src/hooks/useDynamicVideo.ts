import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

export interface VideoConfig {
  id: string;
  src: string;
  intensity: 'subtle' | 'moderate' | 'engaging';
  context: 'homepage' | 'services' | 'contact' | 'about' | 'call';
  trigger: 'idle' | 'scroll' | 'hover' | 'focus' | 'time';
}

const VIDEO_LIBRARY: VideoConfig[] = [
  {
    id: 'tech-particles',
    src: 'https://player.vimeo.com/external/374953889.hd.mp4?s=1e3a87c5b32d9c8b1f2e3d4c5b6a7890&profile_id=175',
    intensity: 'subtle',
    context: 'homepage',
    trigger: 'idle'
  },
  {
    id: 'code-flow',
    src: 'https://player.vimeo.com/external/391982159.hd.mp4?s=2f4b98d6c43e0a9c2g3f4e5d6c7b8901&profile_id=175',
    intensity: 'moderate',
    context: 'services',
    trigger: 'scroll'
  },
  {
    id: 'neural-network',
    src: 'https://player.vimeo.com/external/401729295.hd.mp4?s=3g5c09e7d54f1b0d3h4g5f6e7d8c9012&profile_id=175',
    intensity: 'engaging',
    context: 'contact',
    trigger: 'focus'
  },
  {
    id: 'digital-waves',
    src: 'https://player.vimeo.com/external/385761236.hd.mp4?s=4h6d10f8e65g2c1e4i5h6g7f8e9d0123&profile_id=175',
    intensity: 'moderate',
    context: 'about',
    trigger: 'time'
  },
  {
    id: 'connection-lines',
    src: 'https://player.vimeo.com/external/398547821.hd.mp4?s=5i7e21g9f76h3d2f5j6i7h8g9f0e1234&profile_id=175',
    intensity: 'subtle',
    context: 'call',
    trigger: 'hover'
  }
];

export interface UserBehavior {
  timeOnPage: number;
  scrollDepth: number;
  interactionCount: number;
  focusTime: number;
  idleTime: number;
  visitedPages: string[];
}

export function useDynamicVideo() {
  const [location] = useLocation();
  const [currentVideo, setCurrentVideo] = useState<VideoConfig | null>(null);
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    timeOnPage: 0,
    scrollDepth: 0,
    interactionCount: 0,
    focusTime: 0,
    idleTime: 0,
    visitedPages: []
  });
  const [isVideoActive, setIsVideoActive] = useState(false);

  // Track user behavior
  useEffect(() => {
    let timeInterval: NodeJS.Timeout;
    let idleTimer: NodeJS.Timeout;
    let isIdle = false;

    const startTracking = () => {
      timeInterval = setInterval(() => {
        setUserBehavior(prev => ({
          ...prev,
          timeOnPage: prev.timeOnPage + 1,
          focusTime: document.hasFocus() ? prev.focusTime + 1 : prev.focusTime
        }));
      }, 1000);
    };

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      if (isIdle) {
        isIdle = false;
        setUserBehavior(prev => ({ ...prev, idleTime: 0 }));
      }
      
      idleTimer = setTimeout(() => {
        isIdle = true;
        setUserBehavior(prev => ({ ...prev, idleTime: prev.idleTime + 1 }));
      }, 30000); // 30 seconds idle threshold
    };

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setUserBehavior(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent)
      }));
      resetIdleTimer();
    };

    const handleInteraction = () => {
      setUserBehavior(prev => ({
        ...prev,
        interactionCount: prev.interactionCount + 1
      }));
      resetIdleTimer();
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('mousemove', resetIdleTimer);

    startTracking();
    resetIdleTimer();

    return () => {
      clearInterval(timeInterval);
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('mousemove', resetIdleTimer);
    };
  }, []);

  // Update visited pages
  useEffect(() => {
    setUserBehavior(prev => ({
      ...prev,
      visitedPages: prev.visitedPages.includes(location) 
        ? prev.visitedPages 
        : [...prev.visitedPages, location]
    }));
  }, [location]);

  // Determine current page context
  const getCurrentContext = useCallback((): VideoConfig['context'] => {
    if (location === '/') return 'homepage';
    if (location.includes('/services')) return 'services';
    if (location.includes('/contact')) return 'contact';
    if (location.includes('/about')) return 'about';
    if (location.includes('/book-call')) return 'call';
    return 'homepage';
  }, [location]);

  // Video selection algorithm based on user behavior
  const selectOptimalVideo = useCallback((): VideoConfig | null => {
    const context = getCurrentContext();
    const contextVideos = VIDEO_LIBRARY.filter(video => video.context === context);
    
    if (contextVideos.length === 0) {
      return VIDEO_LIBRARY.find(video => video.context === 'homepage') || null;
    }

    // Behavior-based selection logic
    const { timeOnPage, scrollDepth, interactionCount, idleTime } = userBehavior;

    // High engagement: user has been active and engaged
    if (timeOnPage > 60 && interactionCount > 5 && scrollDepth > 50) {
      return contextVideos.find(video => video.intensity === 'engaging') || contextVideos[0];
    }

    // Medium engagement: some interaction but not highly engaged
    if (timeOnPage > 30 && (interactionCount > 2 || scrollDepth > 25)) {
      return contextVideos.find(video => video.intensity === 'moderate') || contextVideos[0];
    }

    // Low engagement or idle: subtle video or none
    if (idleTime > 10 || (timeOnPage < 30 && interactionCount < 2)) {
      return contextVideos.find(video => video.intensity === 'subtle') || null;
    }

    // Default to first available video for context
    return contextVideos[0];
  }, [userBehavior, getCurrentContext]);

  // Trigger video based on behavior patterns
  const shouldTriggerVideo = useCallback((video: VideoConfig): boolean => {
    const { timeOnPage, scrollDepth, interactionCount, idleTime } = userBehavior;

    switch (video.trigger) {
      case 'idle':
        return idleTime > 15; // Show after 15 seconds of idle
      case 'scroll':
        return scrollDepth > 20; // Show after 20% scroll
      case 'hover':
        return interactionCount > 1; // Show after some interaction
      case 'focus':
        return timeOnPage > 10; // Show after 10 seconds on page
      case 'time':
        return timeOnPage > 45; // Show after 45 seconds
      default:
        return false;
    }
  }, [userBehavior]);

  // Main effect to manage video state
  useEffect(() => {
    const optimalVideo = selectOptimalVideo();
    
    if (optimalVideo && shouldTriggerVideo(optimalVideo)) {
      setCurrentVideo(optimalVideo);
      setIsVideoActive(true);
    } else if (!optimalVideo || userBehavior.idleTime > 60) {
      // Hide video if no suitable video or user has been idle too long
      setIsVideoActive(false);
    }
  }, [userBehavior, selectOptimalVideo, shouldTriggerVideo]);

  const pauseVideo = useCallback(() => {
    setIsVideoActive(false);
  }, []);

  const resumeVideo = useCallback(() => {
    if (currentVideo) {
      setIsVideoActive(true);
    }
  }, [currentVideo]);

  const changeVideoIntensity = useCallback((intensity: VideoConfig['intensity']) => {
    const context = getCurrentContext();
    const newVideo = VIDEO_LIBRARY.find(video => 
      video.context === context && video.intensity === intensity
    );
    
    if (newVideo) {
      setCurrentVideo(newVideo);
      setIsVideoActive(true);
    }
  }, [getCurrentContext]);

  return {
    currentVideo,
    isVideoActive,
    userBehavior,
    pauseVideo,
    resumeVideo,
    changeVideoIntensity,
    videoLibrary: VIDEO_LIBRARY
  };
}