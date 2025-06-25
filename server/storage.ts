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
import { db } from "./db";
import { eq } from "drizzle-orm";

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

  async createEmailSignup(insertSignup: InsertEmailSignup): Promise<EmailSignup> {
    const [signup] = await db
      .insert(emailSignups)
      .values(insertSignup)
      .returning();
    return signup;
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
}

export const storage = new DatabaseStorage();
