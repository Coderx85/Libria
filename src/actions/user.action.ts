"use server"
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { users, User } from "@/database/schema";

export async function getUsers() {
  const dbUser = await db
    .select()
    .from(users)
    .orderBy(users.createdAt)
    .where(eq(users.isAdmin, false))
    .then((res: User[]) => {
      console.log(`${res} users`);
    })
    .catch((err: unknown) => {
      console.log(err);
    });
  return dbUser;
}

