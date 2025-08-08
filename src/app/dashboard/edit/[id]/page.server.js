"use server";

import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function updateCampaignAction(id, formData) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const businessName = formData.get("businessName");
  const businessDescription = formData.get("businessDescription");
  const keywords = formData.get("keywords");
  const location = formData.get("location");

  await db
    .update(campaigns)
    .set({ businessName, businessDescription, keywords, location })
    .where(and(eq(campaigns.id, id), eq(campaigns.userId, userId)));

  redirect("/dashboard");
}
