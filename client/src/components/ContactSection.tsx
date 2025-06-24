import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { Mail, Phone, ChevronDown } from "lucide-react";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
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

  return (
    <section className="py-20 bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-gray-300">
            Ready to start your tech journey? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-black/70 border-gray-800">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-zinc-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-zinc-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                    required
                  />
                </div>
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-zinc-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                  required
                />
                <Textarea
                  name="message"
                  rows={6}
                  placeholder="Tell us about your tech challenges..."
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-zinc-900 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 resize-none"
                  required
                />
                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-blue-500 hover:bg-blue-400 text-black font-semibold py-4"
                >
                  {contactMutation.isPending ? "Sending..." : "Get Clarity"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-black/70 border-gray-800">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Book a Free Call</h3>
                <p className="text-gray-400 mb-6">
                  We'll meet you wherever you are and help you move forward — no pressure.
                </p>
                <Link href="/book-call">
                  <Button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold">
                    Schedule Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-black/70 border-gray-800">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Quick Questions?</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="text-blue-400 mr-4" size={20} />
                    <span className="text-gray-300">hello@codebridge.tech</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="text-blue-400 mr-4" size={20} />
                    <span className="text-gray-300">(555) 123-4567</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* FAQ Preview */}
            <Card className="bg-black/70 border-gray-800">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Common Questions</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-700 pb-4">
                    <button className="text-left w-full text-gray-300 hover:text-white transition-colors duration-300 flex justify-between items-center">
                      <span className="font-medium">How long does a typical project take?</span>
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <div className="border-b border-gray-700 pb-4">
                    <button className="text-left w-full text-gray-300 hover:text-white transition-colors duration-300 flex justify-between items-center">
                      <span className="font-medium">Do you work with complete beginners?</span>
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <div>
                    <button className="text-left w-full text-gray-300 hover:text-white transition-colors duration-300 flex justify-between items-center">
                      <span className="font-medium">What's included in the free consultation?</span>
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
