import { Rocket, Store, HandHeart, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WhoWeHelp() {
  const audiences = [
    {
      icon: Rocket,
      title: "Solo Founders",
      description: "Entrepreneurs who need tech that scales with their vision.",
      color: "text-black bg-gray-200"
    },
    {
      icon: Store,
      title: "Small Business",
      description: "Local businesses ready to compete in the digital age.",
      color: "text-black bg-gray-300"
    },
    {
      icon: HandHeart,
      title: "Nonprofits",
      description: "Mission-driven organizations maximizing impact through technology.",
      color: "text-black bg-gray-400"
    },
    {
      icon: Users,
      title: "Community Leaders",
      description: "Local leaders who want more control and clarity in their systems.",
      color: "text-black bg-gray-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/60 to-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
            Who We <span className="gradient-text">Help</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We work with forward-thinking professionals and organizations ready to modernize without the overwhelm.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <Card 
                key={index}
                className="text-center bg-white/95 border-gray-400 shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <CardContent className="p-8">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${audience.color}`}>
                    <IconComponent size={36} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-black">{audience.title}</h3>
                  <p className="text-gray-700">{audience.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
