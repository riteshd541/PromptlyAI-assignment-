import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EditCampaignPage({ params }) {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const campaign = await db
    .select()
    .from(campaigns)
    .where(
      and(eq(campaigns.id, Number(params.id)), eq(campaigns.userId, userId))
    )
    .then((res) => res[0]);

  if (!campaign) redirect("/dashboard");

  async function updateCampaign(formData) {
    "use server";
    const businessName = formData.get("businessName");
    const businessDescription = formData.get("businessDescription");
    const keywords = formData.get("keywords");
    const location = formData.get("location");

    await db
      .update(campaigns)
      .set({ businessName, businessDescription, keywords, location })
      .where(
        and(eq(campaigns.id, Number(params.id)), eq(campaigns.userId, userId))
      );

    redirect("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Campaign</h1>
      <form action={updateCampaign} className="space-y-4">
        <input
          name="businessName"
          defaultValue={campaign.businessName}
          placeholder="Business Name"
          className="border p-2 w-full"
        />
        <textarea
          name="businessDescription"
          defaultValue={campaign.businessDescription}
          placeholder="Business Description"
          className="border p-2 w-full"
        />
        <input
          name="keywords"
          defaultValue={campaign.keywords}
          placeholder="Keywords"
          className="border p-2 w-full"
        />
        <input
          name="location"
          defaultValue={campaign.location}
          placeholder="Location"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
