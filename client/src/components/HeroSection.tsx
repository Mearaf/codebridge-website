import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Code, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center particle-bg">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Technology Shouldn't Be{" "}
          <span className="gradient-text">Intimidating</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          We help you modernize with clarity, confidence, and support — without the jargon, judgment, or complexity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/book-call">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-400 text-black font-semibold text-lg tech-glow animate-pulse-slow px-8 py-4"
            >
              Book a Free Call
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold text-lg px-8 py-4"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Code className="text-blue-400 w-8 h-8" />
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
          <Users className="text-purple-400 w-10 h-10" />
        </div>
      </div>
    </section>
  );
}
