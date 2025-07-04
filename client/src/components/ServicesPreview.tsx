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
      color: "text-black bg-gray-200 hover:border-black",
      buttonColor: "bg-black hover:bg-gray-800 text-white"
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
      color: "text-black bg-gray-300 hover:border-black",
      buttonColor: "bg-black hover:bg-gray-800 text-white"
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
      color: "text-black bg-gray-400 hover:border-black",
      buttonColor: "bg-black hover:bg-gray-800 text-white"
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
                className="bg-white/95 border-gray-400 shadow-lg hover:shadow-xl transition-all duration-500"
              >
                <CardContent className="p-10">
                  <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 ${service.color}`}>
                    <IconComponent size={36} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-black">{service.title}</h3>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
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
