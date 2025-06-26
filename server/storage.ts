import { 
  users, 
  contacts, 
  emailSignups, 
  clientIntakes, 
  testimonials,
  articles,
  calendarBookings,
  type User, 
  type InsertUser,
  type Contact,
  type InsertContact,
  type EmailSignup,
  type InsertEmailSignup,
  type ClientIntake,
  type InsertClientIntake,
  type Testimonial,
  type InsertTestimonial,
  type Article,
  type InsertArticle,
  type CalendarBooking,
  type InsertCalendarBooking
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createEmailSignup(signup: InsertEmailSignup): Promise<{ signup: EmailSignup; isNew: boolean }>;
  getEmailSignups(): Promise<EmailSignup[]>;
  
  createClientIntake(intake: InsertClientIntake): Promise<ClientIntake>;
  getClientIntakes(): Promise<ClientIntake[]>;
  
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  
  createArticle(article: InsertArticle): Promise<Article>;
  getArticles(): Promise<Article[]>;
  getPublishedArticles(): Promise<Article[]>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  
  createCalendarBooking(booking: InsertCalendarBooking): Promise<CalendarBooking>;
  getCalendarBookings(): Promise<CalendarBooking[]>;
  getUpcomingBookings(): Promise<CalendarBooking[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async createEmailSignup(insertSignup: InsertEmailSignup): Promise<{ signup: EmailSignup; isNew: boolean }> {
    // Check if email already exists
    const existing = await db
      .select()
      .from(emailSignups)
      .where(eq(emailSignups.email, insertSignup.email))
      .limit(1);
    
    if (existing.length > 0) {
      // Return existing signup with flag indicating it's not new
      return { signup: existing[0], isNew: false };
    }
    
    const [signup] = await db
      .insert(emailSignups)
      .values(insertSignup)
      .returning();
    return { signup, isNew: true };
  }

  async getEmailSignups(): Promise<EmailSignup[]> {
    return await db.select().from(emailSignups).orderBy(emailSignups.createdAt);
  }

  async createClientIntake(insertIntake: InsertClientIntake): Promise<ClientIntake> {
    const [intake] = await db
      .insert(clientIntakes)
      .values(insertIntake)
      .returning();
    return intake;
  }

  async getClientIntakes(): Promise<ClientIntake[]> {
    return await db.select().from(clientIntakes).orderBy(clientIntakes.createdAt);
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db
      .insert(testimonials)
      .values(insertTestimonial)
      .returning();
    return testimonial;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(testimonials.createdAt);
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.featured, true))
      .orderBy(testimonials.createdAt);
  }

  async createArticle(insertArticle: InsertArticle): Promise<Article> {
    const [article] = await db
      .insert(articles)
      .values(insertArticle)
      .returning();
    return article;
  }

  async getArticles(): Promise<Article[]> {
    return await db.select().from(articles).orderBy(articles.publishedAt);
  }

  async getPublishedArticles(): Promise<Article[]> {
    return await db.select().from(articles).where(eq(articles.published, true)).orderBy(articles.publishedAt);
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return await db.select().from(articles).where(eq(articles.featured, true)).orderBy(articles.publishedAt);
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const [article] = await db.select().from(articles).where(eq(articles.slug, slug));
    return article || undefined;
  }

  async createCalendarBooking(insertBooking: InsertCalendarBooking): Promise<CalendarBooking> {
    const [booking] = await db
      .insert(calendarBookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async getCalendarBookings(): Promise<CalendarBooking[]> {
    return await db.select().from(calendarBookings).orderBy(calendarBookings.scheduledAt);
  }

  async getUpcomingBookings(): Promise<CalendarBooking[]> {
    return await db.select().from(calendarBookings)
      .where(eq(calendarBookings.status, 'scheduled'))
      .orderBy(calendarBookings.scheduledAt);
  }
}

export const storage = new DatabaseStorage();
