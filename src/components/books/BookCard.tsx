import React from "react";
import Link from "next/link";
import { BookCover } from "@/components/books";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Book } from "@/types";

type BookCardProps = Omit<Book, "status"> & {
  isLoanedBook?: boolean;
  status: "APPROVED" | "REJECTED" | "PENDING";
  onApprove?: () => void;
  onReject?: () => void;
};

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
  status = "PENDING",
  onApprove,
  onReject,
}: BookCardProps) => {
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full", "relative")}>
      <div className={cn(isLoanedBook && "w-full flex flex-col items-center")}>
        {status === "PENDING" && (
          <div className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded-full z-10">
            Pending
          </div>
        )}
        <Link href={`/books/${id}`}>
          <BookCover coverColor={coverColor} coverImage={coverUrl} />

          <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
            <p className="book-title">{title}</p>
            <p className="book-genre">{genre}</p>
          </div>
        </Link>

        {isLoanedBook && (
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

        {status === "PENDING" && (
          <div className="flex gap-2 mt-2">
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onApprove?.();
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onReject?.();
              }}
            >
              Reject
            </Button>
          </div>
        )}
      </div>
    </li>
  );
};

export default BookCard;
