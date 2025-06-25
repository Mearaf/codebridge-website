import { Search, Cog, GraduationCap, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ServicesPreview() {
  const services = [
    {
      icon: Search,
      title: "Tech Audit",
      description: "We evaluate your current workflows, tools, and opportunities to create a clear roadmap for modernization.",
      features: [
        "Current system assessment",
        "Workflow optimization", 
        "Strategic recommendations"
      ],
      color: "text-blue-400 bg-blue-500/20 hover:border-blue-500/50",
      buttonColor: "bg-blue-500 hover:bg-blue-400 text-black"
    },
    {
      icon: Cog,
      title: "Setup & Build",
      description: "We modernize outdated systems or build new ones that grow with your business and empower your team.",
      features: [
        "System implementation",
        "Custom solutions",
        "Integration support"
      ],
      color: "text-purple-400 bg-purple-500/20 hover:border-purple-500/50",
      buttonColor: "bg-purple-600 hover:bg-purple-500 text-white"
    },
    {
      icon: GraduationCap,
      title: "Support & Training",
      description: "Ongoing help, coaching, and team enablement to ensure you're confident and capable with your tech.",
      features: [
        "Ongoing support",
        "Team training",
        "Confidence building"
      ],
      color: "text-orange-400 bg-orange-500/20 hover:border-orange-500/50",
      buttonColor: "bg-orange-600 hover:bg-orange-500 text-white"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white/90 to-gray-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Three core ways we help you bridge the gap between where you are and where you want to be.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className="bg-black/70 border-gray-800 transition-all duration-500 card-hover holographic-border"
              >
                <CardContent className="p-10">
                  <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 ${service.color}`}>
                    <IconComponent size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-400 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <Check className={`mr-3 w-4 h-4 ${service.color.split(' ')[0]}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/book-call">
                    <Button className={`w-full py-4 font-semibold transition-all duration-300 ${service.buttonColor}`}>
                      Let's Talk
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
