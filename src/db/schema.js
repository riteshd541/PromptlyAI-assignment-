import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Clerk user id
  businessName: text("business_name").notNull(),
  businessDescription: text("business_description"),
  keywords: text("keywords"),
  location: text("location"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Leads table
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").notNull(),
  name: text("name"),
  company: text("company"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  website: text("website"),
  score: integer("score"),
  createdAt: timestamp("created_at").defaultNow(),
});
