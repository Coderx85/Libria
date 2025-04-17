import dummyBooks from "@/dummybooks.json";
import ImageKit from "imagekit";
import { books } from "@/database/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
});

const uploadToImageKit = async (
  url: string,
  fileName: string,
  folder: string,
  retries = 3
) => {
  // Validate credentials
  if (!process.env.IMAGEKIT_PRIVATE_KEY || 
      !process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || 
      !process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
    throw new Error("ImageKit credentials are not properly configured");
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await imagekit.upload({
        file: url,
        fileName,
        folder,
        useUniqueFileName: true,
      });

      if (!response?.filePath) {
        throw new Error("Upload successful but no filePath returned");
      }

      return response.filePath;
    } catch (error: unknown) {
      console.error(`Attempt ${attempt}/${retries} failed:`, error);
      
      if (attempt === retries) {
        throw new Error(`Failed to upload after ${retries} attempts: ${error}`);
      }
    }
  }
};

const seed = async () => {
  console.log("Seeding data...");

  try {
    for (const book of dummyBooks) {
      console.log(`Processing book: ${book.title}`);
      
      const coverUrl: string = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      ) || "";

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`,
        "/books/videos"
      );

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });

      console.log(`Successfully processed book: ${book.title}`);
    }

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
