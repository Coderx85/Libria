import React from 'react'
import PendingBookList from '@/components/admin/PendingBookList'
// import { db } from '@/database/drizzle'
// import { books } from '@/database/schema'
// import { eq } from 'drizzle-orm'
import { dummyBooks } from '@/constant/sample'

const BookRequest = async () => {
  // const pendingBooks = await db
  //   .select()
  //   .from(books)
  //   .where(eq(books.status, 'PENDING'))

  const pendingBooks = dummyBooks.filter((book) => book.status === 'PENDING')
  
  return (
    <div className='px-6'>
      <h1 className='text-4xl text-light-200 font-bold'>Pending Books</h1>
      <PendingBookList books={pendingBooks} />
    </div>
  )
}

export default BookRequest