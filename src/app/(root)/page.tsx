import BookList from "@/components/books/BookList";
import BookOverview from "@/components/books/BookOverview";
import { sampleBooks } from "@/constant";
const Home = async () => {
  return (
    <>
      <BookOverview 
      userId={""} id={""} title={""} author={""} genre={""} rating={0} totalCopies={0} availableCopies={0} description={""} coverColor={""} coverUrl={""} videoUrl={""} summary={""} {...sampleBooks}      // userId={session?.user?.id as string} 
      />

      <BookList
        title="Latest Books"
        books={sampleBooks}
        // books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
