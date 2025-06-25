import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, Search, Users, Building, Heart } from "lucide-react";
import Footer from "@/components/Footer";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const filters = [
    { id: "all", label: "All Testimonials", icon: Users },
    { id: "featured", label: "Featured", icon: Star },
    { id: "small-business", label: "Small Business", icon: Building },
    { id: "nonprofit", label: "Nonprofit", icon: Heart }
  ];

  const filteredTestimonials = testimonials?.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "featured" && testimonial.featured) ||
                         (selectedFilter === "small-business" && testimonial.title.toLowerCase().includes("business")) ||
                         (selectedFilter === "nonprofit" && (testimonial.title.toLowerCase().includes("nonprofit") || testimonial.company?.toLowerCase().includes("nonprofit")));
    
    return matchesSearch && matchesFilter;
  });

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6 text-red-600">Error Loading Testimonials</h1>
            <p className="text-gray-700">We're having trouble loading testimonials right now. Please try again later.</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Client <span className="gradient-text">Testimonials</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Real stories from real people who've transformed their relationship with technology.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gradient-to-b from-white/90 to-gray-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search testimonials by name, company, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={selectedFilter === filter.id 
                      ? "bg-black hover:bg-gray-800 text-white"
                      : "border-gray-400 text-black hover:bg-gray-100"
                    }
                  >
                    <IconComponent size={16} className="mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-20 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-zinc-900 border-gray-800 animate-pulse">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-gray-700 rounded-full mr-4"></div>
                      <div>
                        <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-700 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="w-4 h-4 bg-gray-700 rounded"></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredTestimonials?.length === 0 ? (
            <Card className="bg-zinc-900 border-gray-800">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No testimonials found</h3>
                <p className="text-gray-400">
                  {searchTerm ? "Try adjusting your search terms" : "No testimonials match the selected filter"}.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  {searchTerm ? `Search Results (${filteredTestimonials?.length || 0})` : 
                   selectedFilter === "all" ? "All Testimonials" : 
                   filters.find(f => f.id === selectedFilter)?.label}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTestimonials?.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-zinc-900 border-gray-800 card-hover transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-xl">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-400">{testimonial.title}</p>
                          {testimonial.company && (
                            <p className="text-gray-500 text-sm">{testimonial.company}</p>
                          )}
                        </div>
                      </div>
                      
                      {testimonial.featured && (
                        <Badge className="mb-4 bg-blue-900 text-blue-200">
                          Featured
                        </Badge>
                      )}
                      
                      <blockquote className="text-gray-300 leading-relaxed mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex text-blue-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                        {[...Array(5 - testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-gray-600" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join Our <span className="gradient-text">Success Stories</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's talk about how we can help transform your relationship with technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-black font-semibold px-8 py-4 tech-glow">
              Book a Free Call
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-4">
              View Our Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
