import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Code, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-black via-zinc-900 to-black"></div>
        </video>
        <div className="absolute inset-0 bg-slate-900/75"></div>
      </div>
      
      {/* Animated Tech Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 particle-bg"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: "3s" }}></div>
        </div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
          Technology Shouldn't Be{" "}
          <span className="gradient-text animate-glow">Intimidating</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
          We help you modernize with clarity, confidence, and support — without the jargon, judgment, or complexity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/book-call">
            <Button 
              size="lg" 
              className="bg-sky-500 hover:bg-sky-400 text-white font-semibold text-lg tech-glow px-8 py-4 rounded-lg transition-all duration-300"
            >
              Book a Free Call
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Futuristic Floating Elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center backdrop-blur-sm border border-blue-400/30 tech-glow">
          <Code className="text-blue-400 w-10 h-10" />
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center backdrop-blur-sm border border-purple-400/30 tech-glow">
          <Users className="text-purple-400 w-12 h-12" />
        </div>
      </div>
      
      {/* Neural Network Lines */}
      <div className="absolute inset-0 hidden lg:block">
        <svg className="w-full h-full opacity-20" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M100 200 Q 300 100 500 300 T 900 200"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M200 600 Q 400 500 600 600 T 1000 500"
            stroke="url(#line-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <circle cx="100" cy="200" r="4" fill="#3b82f6" className="animate-ping" />
          <circle cx="500" cy="300" r="4" fill="#8b5cf6" className="animate-ping" style={{ animationDelay: "2s" }} />
          <circle cx="900" cy="200" r="4" fill="#3b82f6" className="animate-ping" style={{ animationDelay: "1s" }} />
        </svg>
      </div>
    </section>
  );
}
