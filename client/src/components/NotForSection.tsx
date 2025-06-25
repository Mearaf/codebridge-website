import { Card, CardContent } from "@/components/ui/card";

export default function NotForSection() {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          This <span className="gradient-text">Isn't</span> For Everyone
        </h2>
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          We're not the right fit if you're looking to completely outsource your tech without any involvement. 
          We believe in empowering you to understand and own your technology.
        </p>
        <Card className="bg-black/50 border-gray-800">
          <CardContent className="p-8">
            <p className="text-lg text-gray-400">
              <strong className="text-white">We're perfect for you if:</strong> You want to learn, grow, and feel confident with technology — not just have someone else handle it for you.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
