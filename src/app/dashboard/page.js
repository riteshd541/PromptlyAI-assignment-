import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    return <div className="p-6">Please sign in first.</div>;
  }

  const userCampaigns = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.userId, user.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">ProspectPilot</h1>

          <div className="flex items-center gap-4">
            {/* Create Campaign Button */}
            <Link
              href="/dashboard/new"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + New Campaign
            </Link>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <img
                src={user.imageUrl}
                alt={user.fullName || "User"}
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-gray-700">{user.fullName}</span>
            </div>

            {/* Sign Out */}
            <SignOutButton>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6">My Campaigns</h2>

        {userCampaigns.length === 0 ? (
          <div className="bg-white p-6 rounded shadow text-center text-gray-500">
            No campaigns found. Click{" "}
            <Link href="/dashboard/new" className="text-blue-600 underline">
              here
            </Link>{" "}
            to create one.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Business Name</th>
                  <th className="border p-3 text-left">Description</th>
                  <th className="border p-3 text-left">Keywords</th>
                  <th className="border p-3 text-left">Location</th>
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userCampaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="border p-3">{c.businessName}</td>
                    <td className="border p-3">{c.businessDescription}</td>
                    <td className="border p-3">{c.keywords}</td>
                    <td className="border p-3">{c.location}</td>
                    <td className="flex gap-2">
                      <Link
                        href={`/dashboard/edit/${c.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/delete/${c.id}`}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
