import { SearchableUser, SearchableBook, SearchableOverdue, SearchableSubscription } from "@/lib/search";

export const sampleUsers: SearchableUser[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john.doe@university.edu",
    universityId: "U2025001",
    status: "active",
    role: "student"
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane.smith@university.edu",
    universityId: "U2025002",
    status: "active",
    role: "faculty"
  },
  {
    id: "3",
    fullName: "Robert Johnson",
    email: "robert.j@university.edu",
    universityId: "U2025003",
    status: "inactive",
    role: "student"
  }
];

export const sampleBooks: SearchableBook[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Literature",
    status: "available",
    totalCopies: 5,
    availableCopies: 3
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    status: "borrowed",
    totalCopies: 3,
    availableCopies: 1
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    genre: "Science Fiction",
    status: "reserved",
    totalCopies: 4,
    availableCopies: 0
  }
];

export const sampleOverdueBooks: SearchableOverdue[] = [
  {
    id: "1",
    bookId: "2",
    bookTitle: "To Kill a Mockingbird",
    userId: "1",
    userName: "John Doe",
    dueDate: "2025-04-15",
    daysOverdue: 14
  },
  {
    id: "2",
    bookId: "3",
    bookTitle: "1984",
    userId: "2",
    userName: "Jane Smith",
    dueDate: "2025-04-20",
    daysOverdue: 9
  }
];

export const sampleSubscriptions: SearchableSubscription[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Doe",
    plan: "Premium",
    status: "active",
    startDate: "2025-01-01",
    endDate: "2025-12-31"
  },
  {
    id: "2",
    userId: "2",
    userName: "Jane Smith",
    plan: "Basic",
    status: "active",
    startDate: "2025-03-01",
    endDate: "2025-08-31"
  },
  {
    id: "3",
    userId: "3",
    userName: "Robert Johnson",
    plan: "Premium",
    status: "expired",
    startDate: "2024-07-01",
    endDate: "2025-01-31"
  }
];