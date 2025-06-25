import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Code, Users } from "lucide-react";
import DynamicVideoBackground from "@/components/DynamicVideoBackground";
import SimpleVideoBackground from "@/components/SimpleVideoBackground";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70">
      {/* Simple Video Background for immediate visibility */}
      <SimpleVideoBackground 
        opacity={0.3}
        className="z-0"
      />
      
      {/* Dynamic Video Background */}
      <DynamicVideoBackground 
        opacity={0.4}
        showControls={true}
        className="z-0"
      />
      
      {/* Soft Background Pattern */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.03),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.02),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.8),transparent_50%)]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-black/5 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-gray-400/10 rounded-full opacity-40 animate-float delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-black/3 rounded-full opacity-25 animate-float delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-14 h-14 bg-gray-600/8 rounded-full opacity-35 animate-float delay-3000"></div>
      </div>
      
      <div className="relative z-20 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-black">
          Technology Shouldn't Be{" "}
          <span className="gradient-text">Intimidating</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          We help you modernize with clarity, confidence, and support — without the jargon, judgment, or complexity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/book-call">
            <Button 
              size="lg" 
              className="bg-black hover:bg-gray-800 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 shadow-lg"
            >
              Book a Free Call
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-black text-black hover:bg-black hover:text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Friendly Floating Elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block z-20">
        <div className="w-20 h-20 rounded-3xl bg-white/90 shadow-lg flex items-center justify-center backdrop-blur-sm border border-gray-300">
          <Code className="text-black w-10 h-10" />
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float hidden lg:block z-20" style={{ animationDelay: "2s" }}>
        <div className="w-24 h-24 rounded-3xl bg-white/90 shadow-lg flex items-center justify-center backdrop-blur-sm border border-gray-300">
          <Users className="text-black w-12 h-12" />
        </div>
      </div>
    </section>
  );
}
