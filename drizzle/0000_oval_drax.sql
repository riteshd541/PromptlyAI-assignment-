CREATE TABLE "campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"business_name" text NOT NULL,
	"business_description" text,
	"keywords" text,
	"location" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" integer NOT NULL,
	"name" text,
	"company" text,
	"email" text,
	"phone" text,
	"address" text,
	"website" text,
	"score" integer,
	"created_at" timestamp DEFAULT now()
);
