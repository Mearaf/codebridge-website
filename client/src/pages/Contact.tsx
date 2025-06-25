import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "wouter";
import { Mail, Phone, MapPin, Clock, MessageCircle, Calendar, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import CSSVideoBackground from "@/components/CSSVideoBackground";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertContactSchema.parse(formData);
      contactMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Form validation error",
          description: "Please fill in all required fields correctly.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqData = [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on scope and complexity. A tech audit typically takes 1-2 weeks, while setup and build projects can range from 4-12 weeks. During our initial consultation, we'll provide a more specific timeline based on your needs."
    },
    {
      question: "Do you work with complete beginners?",
      answer: "Absolutely! We specialize in working with people who don't consider themselves 'tech people.' Our approach is designed to meet you exactly where you are and guide you forward with patience and clarity."
    },
    {
      question: "What's included in the free consultation?",
      answer: "Our free consultation is a 30-minute conversation where we discuss your current tech situation, goals, and challenges. We'll explore potential solutions and determine if we're a good fit to work together. No sales pressure, just genuine guidance."
    },
    {
      question: "What types of businesses do you work with?",
      answer: "We work with solo founders, small businesses, nonprofits, and community organizations. Our sweet spot is working with mission-driven people and organizations who want to understand and own their technology, not just outsource it."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! We offer ongoing support and training packages to ensure you stay confident with your technology. This includes regular check-ins, system updates, troubleshooting, and strategic planning."
    },
    {
      question: "What if I'm not sure what I need?",
      answer: "That's exactly why we offer free consultations! Many of our clients come to us feeling overwhelmed and unsure about their tech needs. We'll help you identify priorities and create a clear path forward."
    },
    {
      question: "How do you price your services?",
      answer: "We offer transparent, project-based pricing. Tech audits start at $2,500, setup and build projects start at $8,000, and ongoing support starts at $500/month. We'll provide a detailed proposal after understanding your specific needs."
    },
    {
      question: "Can you work with our existing tools?",
      answer: "In most cases, yes! Part of our approach is evaluating what's already working for you and building from there. We believe in practical solutions that work with your current reality, not forcing you to start over."
    }
  ];

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90 flex items-center justify-center">
        <Card className="bg-white/95 border-gray-400 shadow-lg max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-black">Message Sent!</h2>
            <p className="text-gray-700 mb-6">
              Thank you for reaching out. We'll get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-black hover:bg-gray-800 text-white font-semibold mr-4"
            >
              Send Another Message
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Return Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Ready to start your tech journey? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 bg-gradient-to-b from-white/90 to-gray-50/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/95 border-gray-400 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Book a Free Call</h3>
                <p className="text-gray-700 mb-6">
                  30-minute conversation about your tech goals and challenges.
                </p>
                <Link href="/book-call">
                  <Button className="bg-black hover:bg-gray-800 text-white font-semibold">
                    Schedule Call
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/95 border-gray-400 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Send a Message</h3>
                <p className="text-gray-700 mb-6">
                  Detailed questions or project inquiries via our contact form.
                </p>
                <Button 
                  onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-black hover:bg-gray-800 text-white font-semibold"
                >
                  Message Us
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/95 border-gray-400 shadow-lg text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-black" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-black">Quick Questions</h3>
                <p className="text-gray-700 mb-6">
                  Simple questions or need immediate assistance.
                </p>
                <Button 
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white"
                >
                  Email Direct
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50/60 to-white/90 overflow-hidden">
        <CSSVideoBackground opacity={0.2} className="z-0" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card id="contact-form" className="bg-white/95 border-gray-400 shadow-lg">
              <CardHeader>
                <h2 className="text-2xl font-bold text-black">Send Us a Message</h2>
                <p className="text-gray-700">
                  Tell us about your tech challenges and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-black">Your Name *</label>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-black">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black">Subject *</label>
                    <Input
                      name="subject"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black">Message *</label>
                    <Textarea
                      name="message"
                      rows={6}
                      placeholder="Tell us about your tech challenges, goals, or questions..."
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4"
                  >
                    {contactMutation.isPending ? "Sending..." : "Get Clarity"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Contact Info and FAQ */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="bg-white/95 border-gray-400 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-black">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="text-black mr-4" size={20} />
                      <div>
                        <p className="text-black">Email</p>
                        <p className="text-gray-700">hello@codebridge.tech</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="text-black mr-4" size={20} />
                      <div>
                        <p className="text-black">Phone</p>
                        <p className="text-gray-700">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-black mr-4" size={20} />
                      <div>
                        <p className="text-black">Response Time</p>
                        <p className="text-gray-700">Within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="text-black mr-4" size={20} />
                      <div>
                        <p className="text-black">Service Area</p>
                        <p className="text-gray-700">Remote & Local (US)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="bg-white/95 border-gray-400 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-black">Quick Actions</h3>
                  <div className="space-y-6">
                    <Link href="/book-call">
                      <Button className="w-full bg-black hover:bg-gray-800 text-white font-semibold justify-start">
                        <Calendar className="mr-3" size={16} />
                        Schedule Free Consultation
                      </Button>
                    </Link>
                    <Link href="/client-intake">
                      <Button variant="outline" className="w-full border-black text-black hover:bg-gray-200 hover:text-black justify-start">
                        <MessageCircle className="mr-3" size={16} />
                        Complete Client Intake Form
                      </Button>
                    </Link>
                    <Link href="/services">
                      <Button variant="outline" className="w-full border-black text-black hover:bg-gray-200 hover:text-black justify-start">
                        <CheckCircle className="mr-3" size={16} />
                        View Our Services
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50/60 to-white/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-black">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-700">
              Common questions about working with CodeBridge.
            </p>
          </div>
          
          <Card className="bg-white/95 border-gray-400 shadow-lg">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="space-y-4">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-gray-300">
                    <AccordionTrigger className="text-left hover:text-black transition-colors text-black">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-white/90 to-gray-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-black">
            Still Have <span className="gradient-text">Questions</span>?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            The best way to get answers is to have a conversation. No pressure, just clarity.
          </p>
          <Link href="/book-call">
            <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-4">
              Book Your Free Call
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
