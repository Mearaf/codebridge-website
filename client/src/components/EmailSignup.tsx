import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertEmailSignupSchema } from "@shared/schema";
import { z } from "zod";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const signupMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiRequest("POST", "/api/email-signup", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Welcome to CodeBridge!",
        description: "You've successfully subscribed to our tech tips newsletter.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = insertEmailSignupSchema.parse({ email });
      signupMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/60 to-white/90">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
          Get Monthly <span className="gradient-text">Tech Tips</span>
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Monthly tech tips in plain English — no jargon, just actionable insights.
        </p>
        
        <Card className="bg-white/95 border-gray-400 shadow-lg max-w-2xl mx-auto">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
                required
              />
              <Button
                type="submit"
                disabled={signupMutation.isPending}
                className="bg-black hover:bg-gray-800 text-white font-semibold whitespace-nowrap"
              >
                {signupMutation.isPending ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
