import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { googleCalendar } from "./googleCalendar";
import { 
  insertContactSchema, 
  insertEmailSignupSchema, 
  insertClientIntakeSchema,
  insertArticleSchema,
  insertCalendarBookingSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Email signup
  app.post("/api/email-signup", async (req, res) => {
    try {
      const signupData = insertEmailSignupSchema.parse(req.body);
      const signup = await storage.createEmailSignup(signupData);
      res.json({ success: true, signup });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to subscribe to newsletter" 
        });
      }
    }
  });

  // Client intake form submission
  app.post("/api/client-intake", async (req, res) => {
    try {
      const intakeData = insertClientIntakeSchema.parse(req.body);
      const intake = await storage.createClientIntake(intakeData);
      res.json({ success: true, intake });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit client intake form" 
        });
      }
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch testimonials" 
      });
    }
  });

  // Get featured testimonials
  app.get("/api/testimonials/featured", async (req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch featured testimonials" 
      });
    }
  });

  // Article routes
  app.get("/api/articles", async (req, res) => {
    try {
      const articles = await storage.getPublishedArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch articles" 
      });
    }
  });

  app.get("/api/articles/featured", async (req, res) => {
    try {
      const articles = await storage.getFeaturedArticles();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch featured articles" 
      });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const article = await storage.getArticleBySlug(req.params.slug);
      if (!article) {
        return res.status(404).json({ 
          success: false, 
          message: "Article not found" 
        });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch article" 
      });
    }
  });

  // Google Calendar Authentication Routes
  app.get("/auth/google", (req, res) => {
    const authUrl = googleCalendar.getAuthUrl();
    res.redirect(authUrl);
  });

  app.get("/auth/google/callback", async (req, res) => {
    try {
      const { code } = req.query;
      if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Authorization code required' });
      }

      const tokens = await googleCalendar.getTokenFromCode(code);
      
      // In a real app, you'd save these tokens securely
      // For now, we'll just return success
      res.json({ 
        success: true, 
        message: 'Google Calendar connected successfully!',
        refreshToken: tokens.refresh_token 
      });
    } catch (error) {
      console.error('Google Calendar auth error:', error);
      res.status(500).json({ error: 'Failed to connect Google Calendar' });
    }
  });

  // Chat endpoints
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory, chatType = 'ai' } = req.body;
      
      if (!message?.trim()) {
        return res.status(400).json({ error: "Message is required" });
      }

      let response: string;
      const { chatService } = await import('./chatService');

      switch (chatType) {
        case 'ai':
          response = await chatService.getAIResponse(message, conversationHistory || []);
          break;
        case 'scripted':
          response = chatService.getScriptedResponse(message);
          break;
        case 'live':
          // Create or get live chat session
          const userId = (req as any).sessionID || 'anonymous';
          const session = chatService.createLiveChatSession(userId);
          response = "You've been connected to our live chat. A consultant will be with you shortly!";
          break;
        default:
          response = chatService.getScriptedResponse(message);
      }

      res.json({ 
        response,
        type: chatType,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Chat API error:', error);
      res.status(500).json({ 
        error: "Sorry, I'm having trouble right now. Please try again or contact us directly.",
        fallback: true
      });
    }
  });

  // Live chat session endpoints
  app.get("/api/chat/live/sessions", async (req, res) => {
    try {
      const { chatService } = await import('./chatService');
      const sessions = chatService.getActiveLiveChatSessions();
      res.json(sessions);
    } catch (error) {
      console.error('Live chat sessions error:', error);
      res.status(500).json({ error: "Failed to fetch live chat sessions" });
    }
  });

  app.post("/api/chat/live/:sessionId/message", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { text, isBot } = req.body;
      
      const { chatService } = await import('./chatService');
      const success = chatService.addMessageToLiveChat(sessionId, {
        text,
        isBot,
        type: 'live'
      });

      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Chat session not found" });
      }
    } catch (error) {
      console.error('Live chat message error:', error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  // Calendar booking endpoint
  app.post("/api/calendar/book", async (req, res) => {
    try {
      // Transform form data to match calendar booking schema
      const { name, email, phone, message, scheduledFor } = req.body;
      
      const bookingData = {
        clientName: name,
        clientEmail: email,
        appointmentType: 'consultation',
        scheduledAt: new Date(scheduledFor),
        notes: message,
        status: 'confirmed'
      };
      
      // Create calendar booking in database
      const booking = await storage.createCalendarBooking(bookingData);
      
      // Create Google Calendar event
      const startDateTime = new Date(scheduledFor);
      const endDateTime = new Date(startDateTime.getTime() + (60 * 60 * 1000)); // 1 hour later
      
      const eventDetails = {
        summary: 'CodeBridge Consultation',
        description: `Technology consultation with ${name}\n\nPhone: ${phone || 'Not provided'}\nMessage: ${message || 'N/A'}`,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        attendeeEmail: email,
        location: 'Video Conference (link will be provided)'
      };

      const calendarEvent = await googleCalendar.createEvent(eventDetails);
      
      res.json({ 
        success: true, 
        booking,
        calendarEvent: {
          id: calendarEvent.id,
          htmlLink: calendarEvent.htmlLink,
          meetingLink: calendarEvent.hangoutLink
        }
      });
    } catch (error) {
      console.error('Calendar booking error:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to create calendar booking" 
        });
      }
    }
  });

  // Get available time slots
  app.get("/api/calendar/availability", async (req, res) => {
    try {
      const { date } = req.query;
      
      if (!date || typeof date !== 'string') {
        return res.status(400).json({ error: 'Date parameter required' });
      }

      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      const events = await googleCalendar.getAvailableSlots(
        startDate.toISOString(),
        endDate.toISOString()
      );

      // Generate available slots (9 AM to 5 PM, excluding existing events)
      const availableSlots = [];
      for (let hour = 9; hour < 17; hour++) {
        const slotStart = new Date(startDate);
        slotStart.setHours(hour, 0, 0, 0);
        
        const slotEnd = new Date(slotStart);
        slotEnd.setHours(hour + 1, 0, 0, 0);

        // Check if this slot conflicts with existing events
        const hasConflict = events.some((event: any) => {
          const eventStart = new Date(event.start?.dateTime || event.start?.date);
          const eventEnd = new Date(event.end?.dateTime || event.end?.date);
          return (slotStart < eventEnd && slotEnd > eventStart);
        });

        if (!hasConflict) {
          availableSlots.push({
            startTime: slotStart.toISOString(),
            endTime: slotEnd.toISOString(),
            displayTime: `${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`
          });
        }
      }

      res.json({ availableSlots });
    } catch (error) {
      console.error('Error fetching availability:', error);
      res.status(500).json({ error: 'Failed to fetch availability' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
