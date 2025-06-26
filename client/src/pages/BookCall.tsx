import { Calendar, Clock, Video, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import ConsultationBackground from "@/components/ConsultationBackground";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function BookCall() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  // Ensure page loads at the top and handle navigation
  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    // Clear any hash from URL that might cause scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    // Ensure we stay at top after any potential scroll restoration
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      // Add hourly slots
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      const displayTime = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      
      slots.push({
        startTime: timeString,
        endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
        displayTime: displayTime,
        available: true
      });
      
      // Add half-hour slots (except for last hour)
      if (hour < endHour - 1) {
        const halfHourString = `${hour.toString().padStart(2, '0')}:30`;
        const halfHourDisplay = `${hour > 12 ? hour - 12 : hour === 0 ? 12 : hour}:30 ${hour >= 12 ? 'PM' : 'AM'}`;
        
        slots.push({
          startTime: halfHourString,
          endTime: `${hour.toString().padStart(2, '0')}:30`,
          displayTime: halfHourDisplay,
          available: true
        });
      }
    }
    
    return slots;
  };

  // Get available time slots for selected date
  const availableSlots = selectedDate ? generateTimeSlots() : [];
  const loadingAvailability = false;

  // Book calendar appointment
  const bookingMutation = useMutation({
    mutationFn: async (bookingData: any) => {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error('Booking failed');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Appointment Booked!",
        description: "We'll send you a calendar invitation with the meeting link shortly.",
      });
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedDate('');
      setSelectedTime('');
    },
    onError: () => {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    const scheduledFor = new Date(`${selectedDate}T${selectedTime}:00`).toISOString();
    
    bookingMutation.mutate({
      ...formData,
      scheduledFor,
    });
  };

  // Generate date options (next 30 days, weekdays only)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    return dates;
  };

  return (
    <ConsultationBackground className="pt-16 min-h-screen">
      {/* Hero Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Let's <span className="gradient-text">Talk Tech</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            We'll meet you wherever you are and help you move forward — no pressure, just clarity.
          </p>
        </div>
      </div>

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
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Date Selection */}
                  <div>
                    <Label htmlFor="date">Select Date *</Label>
                    <select
                      id="date"
                      required
                      value={selectedDate}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                        setSelectedTime(''); // Reset time when date changes
                      }}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Choose a date...</option>
                      {getAvailableDates().map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.display}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <Label htmlFor="time">Select Time *</Label>
                      {loadingAvailability ? (
                        <div className="mt-1 p-3 text-gray-500">Loading available times...</div>
                      ) : (
                        <select
                          id="time"
                          required
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                        >
                          <option value="">Choose a time...</option>
                          {availableSlots.map((slot) => (
                            <option key={slot.startTime} value={slot.startTime}>
                              {slot.displayTime}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">What would you like to discuss? (Optional)</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1"
                      placeholder="Tell us about your technology challenges or goals..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={bookingMutation.isPending}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3"
                  >
                    {bookingMutation.isPending ? 'Booking...' : 'Book Free Consultation'}
                  </Button>
                </form>
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
    </ConsultationBackground>
  );
}
