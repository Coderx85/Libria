type BookStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

interface Book {
  id: string; // Change to only string
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  status: BookStatus; // Status of the book (e.g., APPROVED, PENDING, REJECTED)
  createdAt?: Date | null; // Date when the book was added to the database
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams {
  title: string;
  author: string;
  genre: string;
  rating: number;
  coverUrl: string;
  coverColor: string;
  description: string;
  totalCopies: number;
  videoUrl: string;
  summary: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

export type ImageKitResponse = {
  token: string;
  signature: string;
  expire: number;
}

