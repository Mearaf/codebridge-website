import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold">
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
              className="text-white hover:text-blue-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                    location === item.path
                      ? "text-blue-400 bg-gray-900"
                      : "text-gray-300 hover:text-blue-400 hover:bg-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/book-call" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-black font-semibold">
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
