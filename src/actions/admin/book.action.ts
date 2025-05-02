"use server";

import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
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
        title: values.title,
        description: values.description,
      })
      .returning()
      
    return {
      data: book,
      success: true,
    }
  }
  catch (error) {
    console.error("Error creating book:", error);
    return {
      success: false,
      error: "Failed to create book",
    };
  }
  
