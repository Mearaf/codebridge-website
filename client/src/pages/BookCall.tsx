import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import VideoBackgroundSection from "@/components/VideoBackgroundSection";

export default function BookCall() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90">
      {/* Hero Section */}
      <VideoBackgroundSection 
        className="py-20 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70"
        videoSrc="https://videos.pexels.com/video-files/3130182/3130182-uhd_2560_1440_25fps.mp4"
        opacity={0.2}
        useVideo={true}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Let's <span className="gradient-text">Talk Tech</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            We'll meet you wherever you are and help you move forward — no pressure, just clarity.
          </p>
        </div>
      </VideoBackgroundSection>

      {/* Booking Section */}
      <section className="py-20 bg-gradient-to-b from-white/90 to-gray-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calendar Embed */}
            <Card className="bg-white/95 border-gray-400 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center text-black">
                  <Calendar className="mr-3 text-black" size={28} />
                  Schedule Your Free Call
                </h2>
              </CardHeader>
              <CardContent className="p-8">
                {/* Placeholder for calendar integration */}
                <div className="bg-gray-100 rounded-lg p-8 text-center border border-gray-300">
                  <Calendar size={48} className="mx-auto mb-4 text-black" />
                  <h3 className="text-lg font-semibold mb-2 text-black">Calendar Integration</h3>
                  <p className="text-gray-700 mb-6">
                    This would integrate with Calendly, Acuity Scheduling, or similar booking platform.
                  </p>
                  <Button className="bg-black hover:bg-gray-800 text-white font-semibold">
                    Choose Your Time
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Call Information */}
            <div className="space-y-8">
              <Card className="bg-white/95 border-gray-400 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-black">
                    <Video className="mr-3 text-black" size={24} />
                    What to Expect
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 w-4 h-4 text-green-400 flex-shrink-0" />
                      30-minute video call (or phone if you prefer)
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 w-4 h-4 text-green-400 flex-shrink-0" />
                      No sales pitch — just genuine conversation
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 w-4 h-4 text-green-400 flex-shrink-0" />
                      Understanding your current tech situation
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 w-4 h-4 text-green-400 flex-shrink-0" />
                      Discussing your goals and challenges
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-3 mt-0.5 w-4 h-4 text-green-400 flex-shrink-0" />
                      Exploring how we might help (if we're a good fit)
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/95 border-gray-400 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center text-black">
                    <Clock className="mr-3 text-black" size={24} />
                    We'll Cover
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-black mb-2">Your Current Situation</h4>
                      <p className="text-gray-600 text-sm">What's working, what's not, and what's causing stress</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-2">Your Goals</h4>
                      <p className="text-gray-600 text-sm">Where you want to be and what success looks like</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-2">Potential Solutions</h4>
                      <p className="text-gray-600 text-sm">Initial ideas and approaches that might help</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-black mb-2">Next Steps</h4>
                      <p className="text-gray-600 text-sm">Whether we work together or not, you'll leave with clarity</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-100 border-gray-300">
                <CardContent className="p-6">
                  <p className="text-center text-gray-700 italic">
                    "This isn't a sales call. It's a conversation about your relationship with technology and how it could be better."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50/60 to-white/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">
            Common <span className="gradient-text">Questions</span>
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What if I'm not ready to hire anyone yet?",
                answer: "Perfect! This call is about understanding your situation and providing value regardless. Many people find the conversation helpful even if they're not ready to move forward immediately."
              },
              {
                question: "Do I need to prepare anything in advance?",
                answer: "Nope. Just come as you are. It's helpful if you can think about your main tech frustrations and goals, but we'll guide the conversation."
              },
              {
                question: "What if I'm not very technical?",
                answer: "Even better! Our specialty is working with people who don't consider themselves 'tech people.' We speak human, not code."
              },
              {
                question: "How much does this consultation cost?",
                answer: "Nothing. It's completely free. We believe in providing value upfront and building relationships, not extracting information."
              },
              {
                question: "What happens after the call?",
                answer: "We'll send you a summary of what we discussed and any resources we mentioned. If there's a potential fit, we'll outline some options. No pressure, ever."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/95 border-gray-400 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-black mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
