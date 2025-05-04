"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Book } from "@/database/schema";
import { Book as BookType } from "@/types";
import { z } from "zod";
import { AdminResponse } from "@/types/api";
import { bookSchema } from "@/lib/validations";

export async function createBook(values: z.infer<typeof bookSchema>): Promise<AdminResponse<BookType>> {
  try {
    const [book] = await db
      .insert(books)
      .values({
        ...values,
        status: "PENDING",
      })
      .returning();

    return {
      data: book as BookType,
      success: true,
    };
  } catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      error: "Failed to create book",
    };
  }
}

export async function updateBookStatus(
  id: string,
  status: "APPROVED" | "REJECTED"
): Promise<AdminResponse<BookType>> {
  try {
    const [book] = await db
      .update(books)
      .set({
        status,
        availableCopies: status === "APPROVED" ? books.totalCopies : 0,
      })
      .where(eq(books.id, id))
      .returning();

    return {
      data: book as BookType,
      success: true,
    };
  } catch (error) {
    console.error("Error updating book status:", error);
    return {
      success: false,
      error: `Failed to ${status.toLowerCase()} book`,
    };
  }
}

