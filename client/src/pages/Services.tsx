import { Search, Cog, GraduationCap, Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/Footer";

export default function Services() {
  const services = [
    {
      icon: Search,
      title: "Tech Audit",
      subtitle: "Discover Your Digital Opportunities",
      description: "We evaluate your current workflows, tools, and opportunities to create a clear roadmap for modernization.",
      features: [
        "Comprehensive system assessment",
        "Workflow optimization analysis",
        "Strategic improvement recommendations",
        "Priority action plan",
        "Technology stack evaluation",
        "Security and compliance review"
      ],
      process: [
        "Initial consultation and goal setting",
        "Comprehensive technology review",
        "Team interviews and workflow analysis", 
        "Strategic recommendations report",
        "Implementation roadmap creation"
      ],
      color: "text-blue-400 bg-blue-500/20 hover:border-blue-500/50",
      buttonColor: "bg-blue-500 hover:bg-blue-400 text-black",
      timeline: "1-2 weeks",
      price: "Starting at $2,500"
    },
    {
      icon: Cog,
      title: "Setup & Build",
      subtitle: "Implement Solutions That Scale",
      description: "We modernize outdated systems or build new ones that grow with your business and empower your team.",
      features: [
        "Custom system implementation",
        "Legacy system modernization",
        "Third-party integrations",
        "Data migration and cleanup",
        "User interface design",
        "Performance optimization"
      ],
      process: [
        "Detailed requirements gathering",
        "Solution architecture design",
        "Development and testing",
        "User training and documentation",
        "Launch support and monitoring"
      ],
      color: "text-purple-400 bg-purple-500/20 hover:border-purple-500/50",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white",
      timeline: "4-12 weeks",
      price: "Starting at $8,000"
    },
    {
      icon: GraduationCap,
      title: "Support & Training",
      subtitle: "Build Long-Term Confidence",
      description: "Ongoing help, coaching, and team enablement to ensure you're confident and capable with your tech.",
      features: [
        "Ongoing technical support",
        "Team training programs",
        "Documentation and resources",
        "Regular system health checks",
        "Strategic technology planning",
        "Emergency issue resolution"
      ],
      process: [
        "Support needs assessment",
        "Custom training program design",
        "Regular check-ins and updates",
        "Proactive system monitoring",
        "Continuous improvement planning"
      ],
      color: "text-orange-400 bg-orange-500/20 hover:border-orange-500/50",
      buttonColor: "bg-orange-600 hover:bg-orange-500 text-white",
      timeline: "Ongoing",
      price: "Starting at $500/month"
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Three comprehensive approaches to help you bridge the gap between where you are and where you want to be with technology.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${service.color}`}>
                      <IconComponent size={32} />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">{service.title}</h2>
                    <h3 className="text-xl text-gray-400 mb-6">{service.subtitle}</h3>
                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-8">
                      <div className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                        <span className="text-gray-400">Timeline:</span> <span className="text-white">{service.timeline}</span>
                      </div>
                      <div className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                        <span className="text-gray-400">Investment:</span> <span className="text-white">{service.price}</span>
                      </div>
                    </div>
                    
                    <Link href="/book-call">
                      <Button className={`${service.buttonColor} font-semibold`}>
                        Get Started <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                  
                  <Card className="bg-zinc-900 border-gray-800">
                    <CardContent className="p-8">
                      <div className="mb-8">
                        <h4 className="text-lg font-bold mb-4">What's Included</h4>
                        <ul className="space-y-3">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <Check className={`mr-3 mt-0.5 w-4 h-4 flex-shrink-0 ${service.color.split(' ')[0]}`} />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold mb-4">Our Process</h4>
                        <ol className="space-y-3">
                          {service.process.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-start">
                              <span className={`mr-3 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${service.color}`}>
                                {stepIndex + 1}
                              </span>
                              <span className="text-gray-300">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Not Sure Which Service <span className="gradient-text">You Need</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's talk about your goals and challenges. We'll help you find the right path forward.
          </p>
          <Link href="/book-call">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-black font-semibold px-8 py-4 tech-glow">
              Book a Free Consultation
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
