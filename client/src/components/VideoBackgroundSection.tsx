import { ReactNode } from 'react';
import DynamicVideoBackground from '@/components/DynamicVideoBackground';

interface VideoBackgroundSectionProps {
  children: ReactNode;
  className?: string;
  videoOpacity?: number;
  showVideoControls?: boolean;
}

export default function VideoBackgroundSection({ 
  children, 
  className = '',
  videoOpacity = 0.1,
  showVideoControls = false
}: VideoBackgroundSectionProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Dynamic Video Background */}
      <DynamicVideoBackground 
        opacity={videoOpacity}
        showControls={showVideoControls}
        className="z-0"
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}