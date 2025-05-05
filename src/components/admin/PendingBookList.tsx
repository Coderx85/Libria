"use client";

import React from "react";
import { BookCard } from "@/components/books";
import { Book } from "@/types";
import { toast } from "@/hooks/use-toast";
import { updateBookStatus } from "@/actions/admin/book.action";

interface Props {
  books: Book[];
}

const PendingBookList = ({ books }: Props) => {
  if (!books.length) return null;

  const handleStatusUpdate = async (bookId: string, status: "APPROVED" | "REJECTED") => {
    const result = await updateBookStatus(bookId, status);
    
    if (result.success) {
      toast({
        title: "Success",
        description: `Book ${status.toLowerCase()} successfully`,
      });
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-16">
        {books.map((book) => (
          <BookCard
            key={book.id}
            {...book}
            status="PENDING"
            onApprove={() => handleStatusUpdate(book.id, "APPROVED")}
            onReject={() => handleStatusUpdate(book.id, "REJECTED")}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingBookList;