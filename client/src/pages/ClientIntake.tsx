import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Footer from "@/components/Footer";
import { insertClientIntakeSchema } from "@shared/schema";
import { z } from "zod";

export default function ClientIntake() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    currentTools: "",
    mainStruggles: "",
    projectTimeline: "",
    budget: "",
    additionalInfo: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const intakeMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/client-intake", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Intake form submitted!",
        description: "We'll review your information and get back to you within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    try {
      const validatedData = insertClientIntakeSchema.parse(formData);
      intakeMutation.mutate(validatedData);
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

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.businessType;
      case 2:
        return formData.mainStruggles;
      case 3:
        return formData.projectTimeline && formData.budget;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-16 min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-zinc-900 border-gray-800 max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="text-gray-300 mb-6">
              Your client intake form has been submitted successfully. We'll review your information and get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => window.location.href = "/"}
              className="bg-blue-500 hover:bg-blue-400 text-black font-semibold"
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50/60 to-white/90">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Client <span className="gradient-text">Intake</span> Form
          </h1>
          <p className="text-lg text-gray-700">
            Help us understand your needs so we can provide the best guidance
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-gradient-to-b from-white/90 to-gray-50/60">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white/95 border-gray-400 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-black">Step {currentStep} of {totalSteps}</h2>
                <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </CardHeader>
            <CardContent className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-black">Let's start with the basics</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black">Your Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-black">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className="bg-white border-gray-300 text-black placeholder-gray-500 focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Type *</label>
                    <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                      <SelectTrigger className="bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo-founder">Solo Founder / Entrepreneur</SelectItem>
                        <SelectItem value="small-business">Small Business</SelectItem>
                        <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                        <SelectItem value="community-leader">Community Leader</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Current Situation */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tell us about your current tech situation</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">What are your main tech struggles? *</label>
                    <Textarea
                      value={formData.mainStruggles}
                      onChange={(e) => handleInputChange("mainStruggles", e.target.value)}
                      placeholder="Describe the technology challenges you're facing..."
                      rows={4}
                      className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">What tools are you currently using?</label>
                    <Textarea
                      value={formData.currentTools}
                      onChange={(e) => handleInputChange("currentTools", e.target.value)}
                      placeholder="List the software, platforms, or tools you're currently using..."
                      rows={3}
                      className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Optional, but helps us understand your starting point</p>
                  </div>
                </div>
              )}

              {/* Step 3: Project Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Project timeline and budget</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">When would you like to get started? *</label>
                    <Select value={formData.projectTimeline} onValueChange={(value) => handleInputChange("projectTimeline", value)}>
                      <SelectTrigger className="bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Select your preferred timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">As soon as possible</SelectItem>
                        <SelectItem value="1-month">Within 1 month</SelectItem>
                        <SelectItem value="2-3-months">2-3 months</SelectItem>
                        <SelectItem value="3-6-months">3-6 months</SelectItem>
                        <SelectItem value="flexible">I'm flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">What's your approximate budget range? *</label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                      <SelectTrigger className="bg-black border-gray-700 text-white">
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5k">Under $5,000</SelectItem>
                        <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                        <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                        <SelectItem value="30k-plus">$30,000+</SelectItem>
                        <SelectItem value="not-sure">I'm not sure yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Information */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Anything else we should know?</h3>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Information</label>
                    <Textarea
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                      placeholder="Share any additional context, specific requirements, or questions you have..."
                      rows={4}
                      className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Optional</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-200">
                      <strong>Next steps:</strong> After you submit this form, we'll review your information and reach out within 24 hours to schedule a free consultation call.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Previous
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className="bg-blue-500 hover:bg-blue-400 text-black font-semibold"
                  >
                    Next
                    <ChevronRight size={16} className="ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={intakeMutation.isPending || !isStepValid(currentStep)}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold"
                  >
                    {intakeMutation.isPending ? "Submitting..." : "Submit Form"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
