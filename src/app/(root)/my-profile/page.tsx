import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import { BookList } from "@/components/books";
import { sampleBooks } from "@/constant";
import { Metadata } from "next";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { subscriptions } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and manage your profile",
  icons: {
    icon: "/icons/user.svg",
  },
};

export default async function Page() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // Get active subscription if exists
  const [activeSubscription] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, session.user.id))
    .limit(1);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">My Profile</h1>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="outline">Logout</Button>
        </form>
      </div>

      <div className="bg-card p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Subscription Status</h2>
          <Link href="/subscriptions">
            <Button variant="default">
              {activeSubscription ? "Manage Subscription" : "Get Subscription"}
            </Button>
          </Link>
        </div>
        
        {activeSubscription ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Status</p>
              <p className="font-semibold">{activeSubscription.status}</p>
            </div>
            <div>
              <p className="text-gray-600">Price</p>
              <p className="font-semibold">₹{activeSubscription.price}</p>
            </div>
            <div>
              <p className="text-gray-600">Valid Till</p>
              <p className="font-semibold">
                {new Date(activeSubscription.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">
            No active subscription. Subscribe to start borrowing books.
          </p>
        )}
      </div>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </div>
  );
}
