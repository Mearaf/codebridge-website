import { useEffect, useState, useRef } from 'react';

interface MouseEffectWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function MouseEffectWrapper({ 
  children, 
  className = '' 
}: MouseEffectWrapperProps) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`;
      particle.style.borderRadius = '50%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      document.body.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 8000);
    };

    // Create particles periodically
    const particleInterval = setInterval(createParticle, 3000);
    
    // Initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 1000);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      setMousePosition({ x, y });

      // Update CSS variables for mouse tracking
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);

      // Update custom cursor position
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';

      // Add magnetic effect to hoverable elements
      const hoverElements = document.querySelectorAll('.magnetic');
      hoverElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - elementCenterX, 2) + 
          Math.pow(e.clientY - elementCenterY, 2)
        );

        if (distance < 100) {
          const strength = (100 - distance) / 100;
          const moveX = (e.clientX - elementCenterX) * strength * 0.3;
          const moveY = (e.clientY - elementCenterY) * strength * 0.3;
          
          (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          (element as HTMLElement).style.transform = 'translate(0, 0)';
        }
      });

      // Parallax effect
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const moveX = (e.clientX - window.innerWidth / 2) * speed;
        const moveY = (e.clientY - window.innerHeight / 2) * speed;
        (element as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    const handleClick = (e: MouseEvent) => {
      // Create ripple effect at click position
      const ripple = document.createElement('div');
      ripple.style.position = 'fixed';
      ripple.style.left = e.clientX - 25 + 'px';
      ripple.style.top = e.clientY - 25 + 'px';
      ripple.style.width = '50px';
      ripple.style.height = '50px';
      ripple.style.background = 'rgba(0, 0, 0, 0.1)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '9998';
      ripple.style.animation = 'ripple-expand 0.6s ease-out';
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    };

    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple-expand {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      clearInterval(particleInterval);
      
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      }
      
      // Clean up particles
      document.querySelectorAll('.particle').forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Enhanced mouse-responsive overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(circle 400px at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(0,0,0,0.05) 0%, 
              rgba(0,0,0,0.02) 40%,
              transparent 70%),
            radial-gradient(circle 200px at ${mousePosition.x + 10}% ${mousePosition.y - 5}%, 
              rgba(0,0,0,0.03) 0%, 
              transparent 60%)
          `,
          transition: 'background 0.2s ease-out'
        }}
      />
      
      {children}
    </div>
  );
}