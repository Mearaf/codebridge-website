import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi there! I'm Alex, your CodeBridge assistant. I'm here to help you navigate your tech journey with clarity and confidence. What brings you here today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    // Simulate bot response with more human-like responses
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on what you've shared, I think a free consultation would be perfect to explore your options. Would you like me to help you book that?",
        "I understand that feeling - tech can be overwhelming! The good news is that's exactly what we specialize in. Let me connect you with someone who can provide personalized guidance.",
        "Thanks for reaching out! It sounds like you're ready to take the next step. Our team would love to chat with you about your specific situation - no pressure, just helpful conversation."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botResponse = {
        id: messages.length + 2,
        text: randomResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 bg-zinc-900 border-gray-800 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h4 className="text-white font-semibold">CodeBridge Assistant</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white h-6 w-6"
            >
              <X size={16} />
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-64 overflow-y-auto mb-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${
                      msg.isBot
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-black border-gray-700 text-white placeholder-gray-500 text-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-black hover:bg-gray-800 text-white"
              >
                <Send size={16} />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black hover:bg-gray-800 text-white rounded-full p-4 shadow-lg animate-pulse-gentle"
        size="icon"
      >
        <MessageCircle size={24} />
      </Button>
    </div>
  );
}
