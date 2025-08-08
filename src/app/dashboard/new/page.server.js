"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { campaigns } from "@/db/schema";

export async function createCampaign(data) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  await db.insert(campaigns).values({
    userId: user.id,
    businessName: data.businessName,
    businessDescription: data.businessDescription,
    keywords: data.keywords,
    location: data.location,
  });
}
