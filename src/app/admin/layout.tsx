import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { updateSearchData } from "@/lib/search";
import { sampleUsers, sampleBooks, sampleOverdueBooks, sampleSubscriptions } from "@/constant/searchData";

export const metadata: Metadata = {
  title: "Admin | Library",
  description: "Admin dashboard for library management",
  icons: {
    icon: "/icons/admin/logo.svg",
  },
};

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  // Initialize search data
  updateSearchData.users(sampleUsers);
  updateSearchData.books(sampleBooks);
  updateSearchData.overdueBooks(sampleOverdueBooks);
  updateSearchData.subscriptions(sampleSubscriptions);

  return (
    <main className="flex min-h-screen w-full flex-row text-light-300">
      <Sidebar session={session} />
      <div className="admin-container font-bebas-neue">
        <Header session={session} />
        <div className="admin-content">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
