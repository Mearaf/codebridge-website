import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            About <span className="gradient-text">CodeBridge</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            We believe technology should be a bridge, not a barrier. Our mission is to empower people and organizations to confidently embrace the digital future.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-gradient-to-b from-white/90 to-gray-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why CodeBridge <span className="gradient-text">Exists</span>
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Technology has the power to transform lives and businesses, but too often it becomes a source of frustration and overwhelm. We founded CodeBridge because we saw brilliant people and amazing organizations held back not by lack of vision, but by technology that felt intimidating and inaccessible.
                </p>
                <p>
                  Our approach is different. We don't just implement solutions — we teach, guide, and empower. We believe that when people understand their technology, they can make better decisions, adapt to changes, and ultimately achieve more than they thought possible.
                </p>
                <p>
                  Every project we take on is guided by one simple question: "How can we make this person or organization more confident and capable with technology?"
                </p>
              </div>
            </div>
            <Card className="bg-white/95 border-gray-400 shadow-lg">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">CB</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center text-black">Our Promise</h3>
                <p className="text-gray-700 text-center">
                  "We don't just fix problems. We build your confidence with tech."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-gray-50/60 to-white/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-black">
              What Makes Us <span className="gradient-text">Different</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Human-Centered Approach",
                description: "We start with understanding your goals, not with showcasing our technical skills.",
                color: "bg-gray-200 text-black"
              },
              {
                title: "No Jargon Policy",
                description: "We explain everything in plain English. If you don't understand, we haven't done our job.",
                color: "bg-gray-300 text-black"
              },
              {
                title: "Empowerment Focus",
                description: "Our success is measured by how confident and capable you feel with your technology.",
                color: "bg-gray-400 text-black"
              },
              {
                title: "Long-term Partnership",
                description: "We're not looking for quick projects. We want to be your trusted tech guide for years to come.",
                color: "bg-gray-100 text-black"
              },
              {
                title: "Inclusive by Design",
                description: "We welcome and serve people from all backgrounds, especially those who've felt excluded from tech.",
                color: "bg-gray-500 text-white"
              },
              {
                title: "Practical Solutions",
                description: "We choose tools and approaches that actually work for your real-world needs and constraints.",
                color: "bg-gray-600 text-white"
              }
            ].map((value, index) => (
              <Card key={index} className="bg-white/95 border-gray-400 shadow-lg card-hover transition-all duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${value.color} flex items-center justify-center mb-4`}>
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-black">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white/90 to-gray-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your <span className="gradient-text">Tech Journey</span>?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Let's have a conversation about where you are and where you want to go.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-call">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4">
                Book a Free Call
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white px-8 py-4">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
