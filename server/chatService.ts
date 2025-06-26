import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'ai' | 'scripted' | 'live';
}

export interface LiveChatSession {
  id: string;
  userId: string;
  status: 'active' | 'waiting' | 'closed';
  messages: ChatMessage[];
  createdAt: Date;
  lastActivity: Date;
}

export class ChatService {
  private liveChatSessions: Map<string, LiveChatSession> = new Map();
  private knowledgeBase = `
CodeBridge is a technology consulting company that helps small businesses, nonprofits, and solo entrepreneurs modernize their tech infrastructure. 

Our Services:
- Technology Audits & Strategy
- Cloud Migration & Setup
- Workflow Automation
- Cybersecurity Implementation
- Staff Training & Support
- Emergency Tech Support

We specialize in:
- Making technology simple and accessible
- Providing clear, jargon-free explanations
- Offering affordable solutions for small businesses
- Empowering teams to use technology confidently

Common client needs:
- Point of sale systems for restaurants and retail
- Patient management for healthcare practices
- Case management for legal firms
- Inventory systems for small businesses
- Cloud backup and security solutions
- Staff productivity tools

Our approach is human-centered, focusing on education and empowerment rather than overwhelming clients with technical complexity.
`;

  // Enhanced scripted responses with context awareness
  getScriptedResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    // Greeting patterns
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm Alex, your CodeBridge assistant. I'm here to help you explore how technology can empower your business. What questions can I answer for you today?";
    }
    
    // Service inquiries
    if (message.includes('service') || message.includes('help') || message.includes('what do you do')) {
      return "CodeBridge specializes in making technology simple and accessible for small businesses. We offer technology audits, cloud setup, workflow automation, and ongoing support. Would you like to schedule a free consultation to discuss your specific needs?";
    }
    
    // Pricing questions
    if (message.includes('cost') || message.includes('price') || message.includes('expensive')) {
      return "We believe technology solutions should be affordable for small businesses. Our pricing varies based on your specific needs, but we always start with a free consultation to understand your situation. Would you like to book a call to discuss pricing?";
    }
    
    // Technology fears/concerns
    if (message.includes('difficult') || message.includes('complicated') || message.includes('overwhelm')) {
      return "I completely understand that feeling - technology can seem overwhelming! That's exactly why CodeBridge exists. We specialize in making tech simple and providing clear, jargon-free guidance. Our clients often tell us we make the complex feel manageable. Would you like to chat with one of our consultants?";
    }
    
    // Booking requests
    if (message.includes('appointment') || message.includes('schedule') || message.includes('book') || message.includes('call')) {
      return "I'd be happy to help you schedule a consultation! Our free initial calls typically last 30 minutes and help us understand your business needs. You can book directly through our calendar or I can connect you with our team. Which would you prefer?";
    }
    
    // Emergency/urgent requests
    if (message.includes('urgent') || message.includes('emergency') || message.includes('down') || message.includes('broken')) {
      return "It sounds like you might have an urgent technology issue. While I can provide some immediate guidance through chat, for urgent technical problems, I recommend calling our emergency support line or booking an immediate consultation. Can you tell me more about what's happening?";
    }
    
    // Default intelligent response
    return "That's a great question! Based on what you've shared, I think a conversation with one of our technology consultants would be really valuable. They can provide personalized guidance for your specific situation. Would you like me to help you schedule that, or do you have other questions I can answer first?";
  }

  async getAIResponse(userMessage: string, conversationHistory: ChatMessage[]): Promise<string> {
    try {
      const messages = [
        {
          role: "system",
          content: `You are Alex, a friendly and knowledgeable assistant for CodeBridge, a technology consulting company. ${this.knowledgeBase}

Your personality:
- Warm, approachable, and empathetic
- Clear communicator who avoids technical jargon
- Focuses on empowering clients rather than overwhelming them
- Genuinely excited about helping small businesses succeed with technology

Guidelines:
- Keep responses conversational and under 100 words
- Always offer to connect users with a human consultant when appropriate
- Focus on understanding their pain points and offering solutions
- If asked about pricing, mention free consultations
- If they seem overwhelmed, be extra reassuring and supportive
- End responses with a question to keep the conversation flowing when appropriate`
        },
        ...conversationHistory.slice(-5).map(msg => ({
          role: msg.isBot ? "assistant" : "user",
          content: msg.text
        })),
        {
          role: "user",
          content: userMessage
        }
      ];

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
        max_tokens: 150,
        temperature: 0.7
      });

      return response.choices[0].message.content || "I'm here to help! Could you tell me more about what you're looking for?";
    } catch (error) {
      console.error('OpenAI API error:', error);
      // Fallback to scripted response
      return this.getScriptedResponse(userMessage);
    }
  }

  // Live chat session management
  createLiveChatSession(userId: string): LiveChatSession {
    const sessionId = `live_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const session: LiveChatSession = {
      id: sessionId,
      userId,
      status: 'waiting',
      messages: [{
        id: `msg_${Date.now()}`,
        text: "Thanks for reaching out! I'm connecting you with one of our technology consultants. They'll be with you shortly to provide personalized assistance.",
        isBot: true,
        timestamp: new Date(),
        type: 'live'
      }],
      createdAt: new Date(),
      lastActivity: new Date()
    };
    
    this.liveChatSessions.set(sessionId, session);
    return session;
  }

  getLiveChatSession(sessionId: string): LiveChatSession | undefined {
    return this.liveChatSessions.get(sessionId);
  }

  addMessageToLiveChat(sessionId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>): boolean {
    const session = this.liveChatSessions.get(sessionId);
    if (!session) return false;

    const chatMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    session.messages.push(chatMessage);
    session.lastActivity = new Date();
    return true;
  }

  getActiveLiveChatSessions(): LiveChatSession[] {
    return Array.from(this.liveChatSessions.values())
      .filter(session => session.status === 'active' || session.status === 'waiting');
  }

  closeLiveChatSession(sessionId: string): boolean {
    const session = this.liveChatSessions.get(sessionId);
    if (!session) return false;
    
    session.status = 'closed';
    return true;
  }
}

export const chatService = new ChatService();