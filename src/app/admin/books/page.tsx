import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PendingBookList from '@/components/admin/PendingBookList';
import { BookCard } from '@/components/books';
import { dummyBooks } from '@/constant/sample';

const BookPage = async () => {
  // Filter books by status
  const pendingBooks = dummyBooks.filter((book) => book.status === 'PENDING');
  const allBooks = dummyBooks

  return (
    <div className="p-6 space-y-8">
      {/* Pending Books Section */}
      {pendingBooks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Pending Books</h2>
            <Link href="/admin/book-requests">
              <Button variant="outline">Show All</Button>
            </Link>
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-min">
              <PendingBookList books={pendingBooks.slice(0, 5)} />
            </div>
          </div>
        </div>
      )}

      {/* All Books Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">All Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allBooks.map((book) => (
            <BookCard
              key={book.id}
              {...book}
              status={book.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;