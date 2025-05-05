import React from "react";
import { BookCard } from "@/components/books";
import { Book } from "@/types";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  status?: "APPROVED" | "REJECTED" | "PENDING";
}

const BookList = ({ title, books, containerClassName, status }: Props) => {
  if (books.length === 0) return null;
  return (
    <section className={containerClassName}>
      {title && <h2 className="font-bebas-neue text-2xl font-bold text-light-100">{title}</h2>}
      <ul className="book-list">
        {books.map((book) => (
          <BookCard key={book.title} {...book} status={status || "PENDING"} />
        ))}
      </ul>
    </section>
  );
};
export default BookList;
