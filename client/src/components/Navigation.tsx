import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BridgeIcon from "@/components/BridgeIcon";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/resources", label: "Resources" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="relative flex items-center">
            <BridgeIcon 
              className="absolute w-16 h-12 text-gray-600 -left-1 -top-1" 
              isBackground={true}
            />
            <div className="relative z-10 text-2xl font-bold">
              <span className="text-black">Code</span>
              <span className="gradient-text">Bridge</span>
            </div>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition-colors duration-300 ${
                    location === item.path
                      ? "text-black font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:block">
            <Link href="/book-call">
              <Button className="bg-black hover:bg-gray-800 text-white font-semibold">
                Book a Free Call
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-gray-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm border-t border-gray-300">
              <div className="relative flex items-center justify-center py-2 mb-2">
                <BridgeIcon 
                  className="absolute w-14 h-10 text-gray-600" 
                  isBackground={true}
                />
                <div className="relative z-10 text-xl font-bold">
                  <span className="text-black">Code</span>
                  <span className="gradient-text">Bridge</span>
                </div>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                    location === item.path
                      ? "text-black bg-gray-100 font-semibold"
                      : "text-gray-600 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/book-call" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-4 bg-black hover:bg-gray-800 text-white font-semibold">
                  Book a Free Call
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
