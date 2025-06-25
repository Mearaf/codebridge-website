interface ImageBackgroundSectionProps {
  children: React.ReactNode;
  className?: string;
  imageSrc: string;
  opacity?: number;
}

export default function ImageBackgroundSection({ 
  children,
  className = '',
  imageSrc,
  opacity = 0.2
}: ImageBackgroundSectionProps) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${imageSrc})`,
          opacity: opacity,
          filter: 'blur(0.5px) brightness(0.8)'
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}