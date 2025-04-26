"use client"
import React, { useState } from "react";
import { getBooks } from "@/actions/book.action";
import BookList from "@/components/books/BookList";
import BookDialog from "@/components/admin/forms/BookDialog";
import { Book, BookParams } from "@/types";

const BooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookParams | null>(null);

  const fetchBooks = async () => {
    const fetchedBooks = await getBooks("admin-user-id"); // Replace with actual admin user ID
    setBooks(fetchedBooks);
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setIsDialogOpen(true);
  };

  // const handleEditBook = (book: BookParams) => {
  //   setEditingBook(book);
  //   setIsDialogOpen(true);
  // };

  const handleSubmit = (book: BookParams) => {
    if (editingBook) {
      console.log("Updating book:", book);
      // Update book logic here
    } else {
      // Add book logic here
    }
    fetchBooks();
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <section>
      <h1>Books Management</h1>
      <button onClick={handleAddBook}>Add Book</button>
      <BookList
        title="All Books"
        books={books}
        containerClassName="admin-book-list"
      />
      <BookDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingBook || undefined}
      />

    </section>
  );
};

export default BooksPage;