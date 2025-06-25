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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

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
      setScrollY(window.scrollY);
      setUserBehavior(prev => ({
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, scrollPercent)
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleInteraction = () => {
      setUserBehavior(prev => ({
        ...prev,
        interactionCount: prev.interactionCount + 1
      }));
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    startTracking();

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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

  const parallaxOffset = scrollY * 0.5;
  const mouseParallaxX = (mousePosition.x - 50) * 0.02;
  const mouseParallaxY = (mousePosition.y - 50) * 0.02;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Layered geometric background - inspired by Mont-Fort */}
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: opacity * 0.6,
          transform: `translateY(${parallaxOffset * 0.3}px) translateX(${mouseParallaxX}px)`,
          background: `
            linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.02) 49%, rgba(0,0,0,0.02) 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(0,0,0,0.015) 49%, rgba(0,0,0,0.015) 51%, transparent 52%),
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.03) 0%, transparent 50%)
          `,
          backgroundSize: '60px 60px, 80px 80px, 300px 300px',
          animation: 'geometric-shift 30s ease-in-out infinite'
        }}
      />

      {/* Secondary pattern layer */}
      <div 
        className="absolute inset-0"
        style={{ 
          opacity: opacity * 0.4,
          transform: `translateY(${parallaxOffset * 0.6}px) translateX(${mouseParallaxX * -0.5}px)`,
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 120px,
              rgba(0,0,0,0.005) 121px,
              rgba(0,0,0,0.005) 123px
            ),
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 150px,
              rgba(0,0,0,0.008) 151px,
              rgba(0,0,0,0.008) 153px
            )
          `,
          animation: 'grid-flow 40s linear infinite'
        }}
      />

      {/* Floating minimalist elements */}
      <div className="absolute inset-0">
        {/* Large floating rectangles */}
        <div 
          className="absolute w-32 h-1 bg-black/8"
          style={{
            top: '20%',
            left: '15%',
            transform: `translateY(${parallaxOffset * 0.2 + mouseParallaxY * 2}px) rotate(${mouseParallaxX * 0.5}deg)`,
            animation: 'float-slow 25s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-1 h-24 bg-black/6"
          style={{
            top: '60%',
            right: '20%',
            transform: `translateY(${parallaxOffset * -0.3 + mouseParallaxY * -1.5}px) rotate(${mouseParallaxX * -0.3}deg)`,
            animation: 'float-slow 35s ease-in-out infinite reverse'
          }}
        />
        
        {/* Small geometric dots */}
        <div 
          className="absolute w-2 h-2 bg-black/12 rounded-full"
          style={{
            top: '35%',
            left: '70%',
            transform: `translate(${mouseParallaxX * 3}px, ${mouseParallaxY * 2}px)`,
            animation: 'pulse-gentle 8s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-1 h-1 bg-black/15 rounded-full"
          style={{
            top: '75%',
            left: '25%',
            transform: `translate(${mouseParallaxX * -2}px, ${mouseParallaxY * -1}px)`,
            animation: 'pulse-gentle 12s ease-in-out infinite 4s'
          }}
        />
      </div>

      {/* Dynamic gradient overlay that responds to mouse */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.1) 0%, 
              transparent 30%),
            linear-gradient(135deg, 
              rgba(0,0,0,0.01) 0%, 
              rgba(0,0,0,0.03) 50%, 
              rgba(0,0,0,0.01) 100%)
          `,
          opacity: opacity * 0.8
        }}
      />
      
      {/* Debug Info */}
      <div className="absolute top-4 right-4 bg-black/80 text-white text-xs p-3 rounded backdrop-blur-sm">
        <div className="font-semibold mb-1">Mont-Fort Inspired</div>
        <div>Animation: {getAnimationStyle()}</div>
        <div>Mouse: {Math.round(mousePosition.x)}%, {Math.round(mousePosition.y)}%</div>
        <div>Scroll: {Math.round(userBehavior.scrollDepth)}%</div>
        <div>Interactions: {userBehavior.interactionCount}</div>
      </div>
    </div>
  );
}