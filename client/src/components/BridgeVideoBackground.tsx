import { useState, useEffect, useRef } from "react";
import MouseEffectWrapper from "./MouseEffectWrapper";

interface BridgeVideoBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function BridgeVideoBackground({ 
  children, 
  className = ""
}: BridgeVideoBackgroundProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animated bridge-like pattern
    const drawBridge = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Bridge structure lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 2;
      
      // Main bridge span
      const centerY = canvas.height * 0.6;
      const leftX = canvas.width * 0.1;
      const rightX = canvas.width * 0.9;
      const centerX = canvas.width * 0.5;
      const archHeight = canvas.height * 0.15;
      
      // Draw bridge arch
      ctx.beginPath();
      ctx.moveTo(leftX, centerY);
      ctx.quadraticCurveTo(centerX, centerY - archHeight, rightX, centerY);
      ctx.stroke();
      
      // Vertical support cables
      for (let i = 0; i < 8; i++) {
        const x = leftX + (rightX - leftX) * (i / 7);
        const cableHeight = Math.sin((i / 7) * Math.PI) * archHeight * 0.8;
        
        ctx.beginPath();
        ctx.moveTo(x, centerY - cableHeight);
        ctx.lineTo(x, centerY + 50);
        ctx.stroke();
      }
      
      // Tech grid overlay
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.lineWidth = 1;
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };

    drawBridge();
    setVideoLoaded(true);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBridge();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <MouseEffectWrapper className={`relative overflow-hidden ${className}`}>
      {/* Bridge Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: videoLoaded ? 0.4 : 0,
          transition: 'opacity 1.5s ease-in-out'
        }}
      />

      {/* Static Bridge Image Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')`,
          filter: 'brightness(0.3) contrast(1.2) grayscale(1)',
          opacity: 0.08
        }}
      />

      {/* Tech Pattern Overlay */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(0,0,0,0.1) 0%, transparent 25%),
            radial-gradient(circle at 70% 30%, rgba(0,0,0,0.1) 0%, transparent 25%),
            linear-gradient(45deg, transparent 48%, rgba(0,0,0,0.03) 49%, rgba(0,0,0,0.03) 51%, transparent 52%)
          `,
          backgroundSize: '300px 300px, 250px 250px, 15px 15px',
          opacity: 0.5
        }}
      />

      {/* Gradient Overlay for Text Readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(255,255,255,0.95) 0%, 
              rgba(255,255,255,0.8) 30%,
              rgba(255,255,255,0.6) 60%,
              rgba(255,255,255,0.9) 100%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </MouseEffectWrapper>
  );
}