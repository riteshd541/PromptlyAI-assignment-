import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DeleteCampaignPage({ params }) {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  await db
    .delete(campaigns)
    .where(
      and(eq(campaigns.id, Number(params.id)), eq(campaigns.userId, userId))
    );

  redirect("/dashboard");
}
