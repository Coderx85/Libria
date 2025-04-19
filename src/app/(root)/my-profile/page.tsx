import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/books/BookList";
import { sampleBooks } from "@/constant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and manage your profile",
  icons: {
    icon: "/icons/user.svg",
  },
}

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};
export default Page;
