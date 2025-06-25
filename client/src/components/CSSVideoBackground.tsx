import { useState, useEffect } from 'react';

interface CSSVideoBackgroundProps {
  className?: string;
  opacity?: number;
}

interface UserBehavior {
  timeOnPage: number;
  scrollDepth: number;
  interactionCount: number;
}

export default function CSSVideoBackground({ 
  className = '', 
  opacity = 0.3 
}: CSSVideoBackgroundProps) {
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    timeOnPage: 0,
    scrollDepth: 0,
    interactionCount: 0
  });

  useEffect(() => {
    let timeInterval: NodeJS.Timeout;
    
    const startTracking = () => {
      timeInterval = setInterval(() => {
        setUserBehavior(prev => ({
          ...prev,
          timeOnPage: prev.timeOnPage + 1
        }));
      }, 1000);
    };

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setUserBehavior(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent)
      }));
    };

    const handleInteraction = () => {
      setUserBehavior(prev => ({
        ...prev,
        interactionCount: prev.interactionCount + 1
      }));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    startTracking();

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  // CSS-based animated backgrounds that mimic video effects
  const getAnimationStyle = () => {
    const { timeOnPage, scrollDepth, interactionCount } = userBehavior;
    
    // More engaging animations based on user behavior
    if (timeOnPage > 30 && interactionCount > 3) {
      return 'tech-particles-engaging';
    } else if (timeOnPage > 15 || scrollDepth > 25) {
      return 'tech-particles-moderate';
    } else {
      return 'tech-particles-subtle';
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Animated particle background */}
      <div 
        className={`absolute inset-0 ${getAnimationStyle()}`}
        style={{ 
          opacity: opacity,
          background: `
            radial-gradient(circle at 20% 80%, rgba(0,0,0,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0,0,0,0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0,0,0,0.05) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.02) 100%)
          `,
          backgroundSize: '400px 400px, 300px 300px, 200px 200px, 100% 100%',
          animation: 'particle-drift 20s ease-in-out infinite'
        }}
      />
      
      {/* Floating tech elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-black/10 rounded-full animate-float opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-black/15 rounded-full animate-float delay-1000 opacity-40"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-black/5 rounded-full animate-float delay-2000 opacity-25"></div>
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-black/12 rounded-full animate-float delay-3000 opacity-35"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-black/8 animate-pulse delay-4000 opacity-20"></div>
        <div className="absolute top-3/4 left-1/6 w-6 h-1 bg-black/6 animate-pulse delay-5000 opacity-15"></div>
      </div>
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />
      
      {/* Debug Info */}
      <div className="absolute top-4 right-4 bg-blue-800/80 text-white text-xs p-2 rounded backdrop-blur-sm">
        <div>Animation: {getAnimationStyle()}</div>
        <div>Time: {userBehavior.timeOnPage}s</div>
        <div>Scroll: {Math.round(userBehavior.scrollDepth)}%</div>
        <div>Interactions: {userBehavior.interactionCount}</div>
      </div>
    </div>
  );
}