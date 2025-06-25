import { useEffect, useRef, useState } from 'react';

interface EnhancedBackgroundProps {
  children: React.ReactNode;
  className?: string;
  opacity?: number;
}

export default function EnhancedBackground({ 
  children,
  className = '',
  opacity = 0.3
}: EnhancedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Tech-themed particle system
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: 'dot' | 'line' | 'square';
    }> = [];

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        type: ['dot', 'line', 'square'][Math.floor(Math.random() * 3)] as 'dot' | 'line' | 'square'
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mousePosition.x * canvas.width / 100 - particle.x;
        const dy = mousePosition.y * canvas.height / 100 - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += dx * 0.00005 * force;
          particle.vy += dy * 0.00005 * force;
        }

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle based on type
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        
        if (particle.type === 'dot') {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'square') {
          ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        } else if (particle.type === 'line') {
          ctx.fillRect(particle.x, particle.y, particle.size * 3, 1);
        }
      });

      // Draw connecting lines
      particles.forEach((particle, index) => {
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 0, 0, ${0.05 * (1 - distance / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      />

      {/* Sophisticated gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.1) 0%, 
              transparent 40%),
            linear-gradient(135deg, 
              rgba(0,0,0,0.02) 0%, 
              transparent 50%,
              rgba(0,0,0,0.02) 100%),
            linear-gradient(45deg, 
              transparent 48%, 
              rgba(0,0,0,0.01) 49%, 
              rgba(0,0,0,0.01) 51%, 
              transparent 52%)
          `,
          backgroundSize: '100% 100%, 100% 100%, 60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}