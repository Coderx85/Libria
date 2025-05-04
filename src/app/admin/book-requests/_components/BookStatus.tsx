import React from 'react'
import Link from "next/link";
import { BookCover } from "@/components/books";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";
import { sampleBooks } from '@/constant';

interface PendingBookCard extends Book {
  status: "APPROVE" | "REJECT" | "PENDING";
}

const BookCard = ({
  status= "PENDING",
}: PendingBookCard) => {

  const { id, title, author, genre, rating, totalCopies, availableCopies, description, coverColor, coverUrl, videoUrl, summary } = sampleBooks[0]!; // Replace with actual data fetching logic
  return (
  <li className={cn("")}>
    <Link
      href={`/books/${id}`}
      className={cn("w-full flex flex-col items-center")}
    >
      <BookCover coverColor={coverColor} coverImage={coverUrl} />

      <div className={cn("mt-4 xs:max-w-40 max-w-28")}>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
      </div>

      {(
        <div className="mt-3 w-full">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-light-100">11 days left to return</p>
          </div>

          <Button className="book-btn">Download receipt</Button>
        </div>
      )}
    </Link>
  </li>
)};

export default BookCard;