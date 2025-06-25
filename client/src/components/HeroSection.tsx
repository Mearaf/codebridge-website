import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Code, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Soft Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(245,158,11,0.03),transparent_50%)]"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-25 animate-float delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-pink-200 rounded-full opacity-15 animate-float delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-14 h-14 bg-yellow-200 rounded-full opacity-20 animate-float delay-3000"></div>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-800">
          Technology Shouldn't Be{" "}
          <span className="gradient-text">Intimidating</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          We help you modernize with clarity, confidence, and support — without the jargon, judgment, or complexity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/book-call">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg warm-glow px-8 py-4 rounded-xl transition-all duration-300 shadow-lg"
            >
              Book a Free Call
            </Button>
          </Link>
          <Link href="/about">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Friendly Floating Elements */}
      <div className="absolute top-20 left-10 animate-float hidden lg:block">
        <div className="w-20 h-20 rounded-3xl bg-white/80 shadow-lg flex items-center justify-center backdrop-blur-sm border border-blue-200">
          <Code className="text-blue-500 w-10 h-10" />
        </div>
      </div>
      <div className="absolute bottom-20 right-10 animate-float hidden lg:block" style={{ animationDelay: "2s" }}>
        <div className="w-24 h-24 rounded-3xl bg-white/80 shadow-lg flex items-center justify-center backdrop-blur-sm border border-purple-200">
          <Users className="text-purple-500 w-12 h-12" />
        </div>
      </div>
    </section>
  );
}
