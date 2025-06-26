import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, Download, ExternalLink, Clock } from "lucide-react";
import Footer from "@/components/Footer";
import VideoBackgroundSection from "@/components/VideoBackgroundSection";

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "articles", label: "Articles" },
    { id: "videos", label: "Videos" },
    { id: "guides", label: "Guides" },
    { id: "tools", label: "Tools" }
  ];

  const resources = [
    {
      id: 1,
      title: "The Complete Guide to Choosing Business Software",
      excerpt: "A comprehensive guide to evaluating and selecting the right software for your business needs.",
      category: "guides",
      type: "Guide",
      readTime: "15 min read",
      featured: true,
      tags: ["Software Selection", "Business Tools", "Decision Making"]
    },
    {
      id: 2,
      title: "5 Signs Your Business Needs a Tech Audit",
      excerpt: "Learn to recognize when it's time to evaluate your current technology stack.",
      category: "articles",
      type: "Article",
      readTime: "8 min read",
      featured: false,
      tags: ["Tech Audit", "Business Growth", "Efficiency"]
    },
    {
      id: 3,
      title: "Setting Up Your First CRM: A Step-by-Step Walkthrough",
      excerpt: "Watch as we guide a small business through their first CRM implementation.",
      category: "videos",
      type: "Video",
      readTime: "22 min watch",
      featured: true,
      tags: ["CRM", "Implementation", "Customer Management"]
    },
    {
      id: 4,
      title: "Small Business Technology Checklist",
      excerpt: "A downloadable checklist to ensure you have all the essential tech tools in place.",
      category: "tools",
      type: "Checklist",
      readTime: "Download",
      featured: false,
      tags: ["Checklist", "Small Business", "Technology Stack"]
    },
    {
      id: 5,
      title: "Understanding Cloud Storage for Nonprofits",
      excerpt: "Everything you need to know about cloud storage options that work for nonprofit budgets.",
      category: "articles",
      type: "Article",
      readTime: "12 min read",
      featured: false,
      tags: ["Cloud Storage", "Nonprofits", "Data Security"]
    },
    {
      id: 6,
      title: "Database Basics: What Every Business Owner Should Know",
      excerpt: "Demystifying databases and how they can transform your business operations.",
      category: "guides",
      type: "Guide",
      readTime: "18 min read",
      featured: false,
      tags: ["Databases", "Business Operations", "Data Management"]
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResource = resources.find(r => r.featured);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video size={16} className="text-purple-400" />;
      case "guide":
        return <BookOpen size={16} className="text-blue-400" />;
      case "checklist":
        return <Download size={16} className="text-green-400" />;
      default:
        return <BookOpen size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Plain-English <span className="gradient-text">Tech Tips</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            No jargon, no judgment — just practical guidance to help you make better technology decisions.
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
                placeholder="Search articles, guides, and videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "bg-black hover:bg-gray-800 text-white"
                    : "border-gray-400 text-black hover:bg-gray-100"
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      {featuredResource && selectedCategory === "all" && !searchTerm && (
        <section className="pb-12 bg-gradient-to-b from-white/90 to-gray-50/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-black">Featured Resource</h2>
            <Card className="bg-gradient-to-r from-white/95 to-gray-50/90 border-gray-400 shadow-lg">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-2 mb-3">
                      {getIcon(featuredResource.type)}
                      <Badge variant="secondary" className="bg-gray-200 text-black">
                        {featuredResource.type}
                      </Badge>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock size={14} />
                        {featuredResource.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-black">{featuredResource.title}</h3>
                    <p className="text-gray-700 mb-4">{featuredResource.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {featuredResource.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-gray-400 text-gray-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <Button className="bg-black hover:bg-gray-800 text-white font-semibold">
                      Read Now
                      <ExternalLink size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Resources Grid */}
      <section className="pb-20 bg-gradient-to-b from-gray-50/60 to-white/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-black">
              {searchTerm ? `Search Results (${filteredResources.length})` : 
               selectedCategory === "all" ? "All Resources" : 
               categories.find(c => c.id === selectedCategory)?.label}
            </h2>
          </div>
          
          {filteredResources.length === 0 ? (
            <Card className="bg-white/95 border-gray-400 shadow-lg">
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-black">No resources found</h3>
                <p className="text-gray-700">
                  Try adjusting your search terms or browse all categories.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources
                .filter(r => !r.featured || selectedCategory !== "all" || searchTerm)
                .map((resource) => (
                <Card key={resource.id} className="bg-white/95 border-gray-400 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIcon(resource.type)}
                        <Badge variant="secondary" className="text-xs">
                          {resource.type}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {resource.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold line-clamp-2">{resource.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{resource.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-500 text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 2 && (
                        <Badge variant="outline" className="border-gray-600 text-gray-500 text-xs">
                          +{resource.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      {resource.type === "Checklist" ? "Download" : "Read More"}
                      <ExternalLink size={14} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
            `,
            backgroundSize: '60px 60px',
            animation: 'float-pattern 20s linear infinite'
          }} />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300 shadow-2xl hover-lift magnetic transform-3d glow stagger-animation">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6 ripple">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-black mb-6 glitch">
              Get Monthly <span className="gradient-text">Tech Tips</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed parallax">
              Stay ahead with practical insights, tools, and strategies delivered to your inbox monthly. No spam, just valuable content.
            </p>
            <div className="mb-8">
              <Button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-6 text-lg hover-lift ripple magnetic morph-shape">
                Subscribe Now
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
              <div className="flex items-center space-x-2 magnetic">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Monthly insights</span>
              </div>
              <div className="flex items-center space-x-2 magnetic">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">Practical tools</span>
              </div>
              <div className="flex items-center space-x-2 magnetic">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium">No spam</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating tech icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-pulse parallax">
            <Search className="w-6 h-6 text-white/60" />
          </div>
          <div className="absolute top-3/4 right-1/4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center animate-pulse parallax" style={{ animationDelay: '1s' }}>
            <Video className="w-5 h-5 text-white/60" />
          </div>
          <div className="absolute top-1/2 left-1/6 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center animate-pulse parallax" style={{ animationDelay: '2s' }}>
            <Download className="w-4 h-4 text-white/60" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
