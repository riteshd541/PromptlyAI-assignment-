"use server";

import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteCampaignAction(id) {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  // Only delete if it belongs to the logged-in user
  await db
    .delete(campaigns)
    .where(and(eq(campaigns.id, id), eq(campaigns.userId, userId)));

  revalidatePath("/dashboard");
}
