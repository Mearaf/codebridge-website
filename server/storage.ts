import { 
  users, 
  contacts, 
  emailSignups, 
  clientIntakes, 
  testimonials,
  type User, 
  type InsertUser,
  type Contact,
  type InsertContact,
  type EmailSignup,
  type InsertEmailSignup,
  type ClientIntake,
  type InsertClientIntake,
  type Testimonial,
  type InsertTestimonial
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createEmailSignup(signup: InsertEmailSignup): Promise<EmailSignup>;
  getEmailSignups(): Promise<EmailSignup[]>;
  
  createClientIntake(intake: InsertClientIntake): Promise<ClientIntake>;
  getClientIntakes(): Promise<ClientIntake[]>;
  
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private emailSignups: Map<number, EmailSignup>;
  private clientIntakes: Map<number, ClientIntake>;
  private testimonials: Map<number, Testimonial>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.emailSignups = new Map();
    this.clientIntakes = new Map();
    this.testimonials = new Map();
    this.currentId = 1;
    
    // Add some sample testimonials
    this.seedTestimonials();
  }

  private seedTestimonials() {
    const sampleTestimonials: InsertTestimonial[] = [
      {
        name: "Sarah Johnson",
        title: "Small Business Owner",
        company: "Local Boutique",
        quote: "CodeBridge didn't just modernize our systems — they transformed how our entire team thinks about technology. We went from avoiding new tools to actively seeking ways to improve our processes.",
        rating: 5,
        featured: true
      },
      {
        name: "Michael Chen",
        title: "Nonprofit Director",
        company: "Community Impact Fund",
        quote: "I was completely overwhelmed by all the tech options out there. CodeBridge helped us find exactly what we needed and taught us how to use it effectively. Now we're serving more people than ever.",
        rating: 5,
        featured: true
      },
      {
        name: "Emily Rodriguez",
        title: "Solo Founder",
        company: "Creative Solutions",
        quote: "The team at CodeBridge made technology feel approachable for the first time. They didn't just implement solutions — they empowered me to understand and manage them myself.",
        rating: 5,
        featured: false
      }
    ];

    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createEmailSignup(insertSignup: InsertEmailSignup): Promise<EmailSignup> {
    const id = this.currentId++;
    const signup: EmailSignup = { 
      ...insertSignup, 
      id, 
      createdAt: new Date() 
    };
    this.emailSignups.set(id, signup);
    return signup;
  }

  async getEmailSignups(): Promise<EmailSignup[]> {
    return Array.from(this.emailSignups.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createClientIntake(insertIntake: InsertClientIntake): Promise<ClientIntake> {
    const id = this.currentId++;
    const intake: ClientIntake = { 
      ...insertIntake, 
      id, 
      createdAt: new Date() 
    };
    this.clientIntakes.set(id, intake);
    return intake;
  }

  async getClientIntakes(): Promise<ClientIntake[]> {
    return Array.from(this.clientIntakes.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentId++;
    const testimonial: Testimonial = { 
      ...insertTestimonial, 
      id, 
      createdAt: new Date() 
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values())
      .filter(t => t.featured)
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
}

export const storage = new MemStorage();
