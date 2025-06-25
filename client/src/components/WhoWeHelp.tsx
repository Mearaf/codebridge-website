import { Rocket, Store, HandHeart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WhoWeHelp() {
  const audiences = [
    {
      icon: Rocket,
      title: "Solo Founders",
      description: "Entrepreneurs who need tech that scales with their vision.",
      color: "text-blue-400 bg-blue-500/20"
    },
    {
      icon: Store,
      title: "Small Business",
      description: "Local businesses ready to compete in the digital age.",
      color: "text-purple-400 bg-purple-500/20"
    },
    {
      icon: HandHeart,
      title: "Nonprofits",
      description: "Mission-driven organizations maximizing impact through technology.",
      color: "text-orange-400 bg-orange-500/20"
    },
    {
      icon: Users,
      title: "Community Leaders",
      description: "Local leaders who want more control and clarity in their systems.",
      color: "text-blue-400 bg-blue-500/20"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Who We <span className="gradient-text">Help</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We work with forward-thinking professionals and organizations ready to modernize without the overwhelm.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <Card 
                key={index}
                className="text-center bg-zinc-900 border-gray-800 card-hover holographic-border transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${audience.color}`}>
                    <IconComponent size={36} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{audience.title}</h3>
                  <p className="text-gray-400">{audience.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
