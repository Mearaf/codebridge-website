import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Phone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'ai' | 'scripted' | 'live';
  isTyping?: boolean;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMode, setChatMode] = useState<'ai' | 'scripted' | 'live'>('ai');
  const [isLoading, setIsLoading] = useState(false);
  const [liveChatStatus, setLiveChatStatus] = useState<'available' | 'busy' | 'offline'>('available');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      text: "👋 Hi there! I'm Alex, your CodeBridge assistant. I'm here to help you navigate your tech journey with clarity and confidence. What brings you here today?",
      isBot: true,
      timestamp: new Date(),
      type: 'ai'
    }
  ]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      text: message,
      isBot: false,
      timestamp: new Date(),
      type: chatMode
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: ChatMessage = {
      id: 'typing',
      text: 'Alex is typing...',
      isBot: true,
      timestamp: new Date(),
      type: chatMode,
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          conversationHistory: messages.filter(m => !m.isTyping),
          chatType: chatMode
        }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      const data = await response.json();
      
      // Remove typing indicator and add bot response
      setMessages(prev => {
        const withoutTyping = prev.filter(m => !m.isTyping);
        return [...withoutTyping, {
          id: `bot_${Date.now()}`,
          text: data.response,
          isBot: true,
          timestamp: new Date(),
          type: data.type || chatMode
        }];
      });

    } catch (error) {
      console.error('Chat error:', error);
      // Remove typing indicator and show error
      setMessages(prev => {
        const withoutTyping = prev.filter(m => !m.isTyping);
        return [...withoutTyping, {
          id: `error_${Date.now()}`,
          text: "I'm having trouble right now. Please try again or feel free to contact us directly for immediate assistance.",
          isBot: true,
          timestamp: new Date(),
          type: 'scripted'
        }];
      });
      
      toast({
        title: "Connection Issue",
        description: "Chat is temporarily unavailable. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const handleModeChange = (newMode: 'ai' | 'scripted' | 'live') => {
    setChatMode(newMode);
    
    let modeMessage = "";
    switch (newMode) {
      case 'ai':
        modeMessage = "🤖 Switched to AI mode. I can now provide intelligent responses to your technology questions!";
        break;
      case 'scripted':
        modeMessage = "📝 Switched to quick response mode. I'll provide fast, helpful answers to common questions.";
        break;
      case 'live':
        if (liveChatStatus === 'available') {
          modeMessage = "👨‍💼 Connecting you to live support. A human consultant will be with you shortly!";
        } else {
          modeMessage = "👨‍💼 Our consultants are currently busy. You'll be added to the queue and we'll be with you as soon as possible.";
        }
        break;
    }

    const modeChangeMessage: ChatMessage = {
      id: `mode_${Date.now()}`,
      text: modeMessage,
      isBot: true,
      timestamp: new Date(),
      type: newMode
    };

    setMessages(prev => [...prev, modeChangeMessage]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-96 bg-zinc-900 border-gray-800 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <h4 className="text-white font-semibold">CodeBridge Assistant</h4>
              <Badge 
                variant={chatMode === 'live' ? 'default' : 'secondary'}
                className={`text-xs ${
                  chatMode === 'ai' ? 'bg-blue-600' : 
                  chatMode === 'scripted' ? 'bg-green-600' : 
                  'bg-purple-600'
                }`}
              >
                {chatMode === 'ai' ? '🤖 AI' : chatMode === 'scripted' ? '⚡ Quick' : '👨‍💼 Live'}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Select value={chatMode} onValueChange={(value: 'ai' | 'scripted' | 'live') => handleModeChange(value)}>
                <SelectTrigger className="w-auto h-6 text-xs bg-gray-800 border-gray-700 text-gray-300">
                  <Settings size={12} />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="ai" className="text-gray-300 hover:bg-gray-700">
                    🤖 AI Assistant
                  </SelectItem>
                  <SelectItem value="scripted" className="text-gray-300 hover:bg-gray-700">
                    ⚡ Quick Responses
                  </SelectItem>
                  <SelectItem value="live" className="text-gray-300 hover:bg-gray-700">
                    👨‍💼 Live Support
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white h-6 w-6"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-80 overflow-y-auto mb-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[85%] ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      msg.isBot ? 'bg-gray-700' : 'bg-blue-500'
                    }`}>
                      {msg.isBot ? (
                        msg.type === 'live' ? <Phone size={12} className="text-white" /> : 
                        <Bot size={12} className="text-white" />
                      ) : (
                        <User size={12} className="text-white" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        msg.isBot
                          ? msg.isTyping 
                            ? 'bg-gray-700 text-gray-400 italic animate-pulse' 
                            : 'bg-gray-800 text-gray-300'
                          : 'bg-blue-500 text-white'
                      }`}
                    >
                      {msg.text}
                      <div className={`text-xs mt-1 opacity-60 ${msg.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  chatMode === 'ai' ? 'Ask me about technology...' :
                  chatMode === 'scripted' ? 'Type your question...' :
                  'Connect with our team...'
                }
                className="bg-black border-gray-700 text-white placeholder-gray-500 text-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-black hover:bg-gray-800 text-white"
                disabled={isLoading || !message.trim()}
              >
                <Send size={16} />
              </Button>
            </form>
            <div className="flex justify-center mt-2">
              <div className="text-xs text-gray-500 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${chatMode === 'ai' ? 'bg-blue-500' : 'bg-gray-600'}`} />
                  AI Mode
                </span>
                <span className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${chatMode === 'scripted' ? 'bg-green-500' : 'bg-gray-600'}`} />
                  Quick Mode
                </span>
                <span className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${
                    chatMode === 'live' ? 
                      liveChatStatus === 'available' ? 'bg-green-500' : 
                      liveChatStatus === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                    : 'bg-gray-600'
                  }`} />
                  Live Support
                </span>
              </div>
            </div>
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
