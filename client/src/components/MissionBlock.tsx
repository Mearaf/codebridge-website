import { Heart, Handshake, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MissionBlock() {
  const values = [
    {
      icon: Heart,
      title: "Empowerment",
      description: "We don't just fix problems. We build your confidence with tech.",
      color: "text-blue-400 bg-blue-500/20 hover:border-blue-500/50"
    },
    {
      icon: Handshake,
      title: "Partnership",
      description: "We're your friendly guide, not just another vendor.",
      color: "text-purple-400 bg-purple-500/20 hover:border-purple-500/50"
    },
    {
      icon: Lightbulb,
      title: "Clarity",
      description: "No jargon, no judgment — just clear, actionable guidance.",
      color: "text-orange-400 bg-orange-500/20 hover:border-orange-500/50"
    }
  ];

  return (
    <section className="py-20 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Our <span className="gradient-text">Mission</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12">
            "At CodeBridge, we believe technology should empower — not intimidate. We meet people where they are and guide them forward with clarity, warmth, and the best modern tools."
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={index}
                  className="bg-black/50 border-gray-800 hover:border-opacity-50 transition-all duration-300 card-hover holographic-border"
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${value.color}`}>
                      <IconComponent size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
