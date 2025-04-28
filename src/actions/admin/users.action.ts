import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { AdminResponse, UsersResponse } from "@/types/index";
import { eq } from "drizzle-orm";

export async function getUsers(): UsersResponse {
  try {
    const allUsers = await db.select().from(users);
    return ({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    // throw new Error("Failed to fetch users");
    return ({
      success: false,
      error: "Failed to fetch users",
    });
  }
}

export async function deleteUser(userId: string): AdminResponse<null> {
  try {
    await db.delete(users).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    // throw new Error("Failed to delete user");
    return { success: false, error: "Failed to delete user" };
  }
}

export async function updateUser(userId: string, userData: Partial<typeof users.$inferSelect>): 
  AdminResponse<typeof users.$inferSelect> {
  // Validate userData here if needed
  try {
    const [data] = await db.update(users)
      .set(userData)
      .where(eq(users.id, userId))
      .returning();
    return { success: true, data };
  } catch (error) {
    console.error("Error updating user:", error);
    // throw new Error("Failed to update user");
    return { success: false, error: "Failed to update user" };
  }
}