import { User } from "@/database/schema";

export type SearchableUser = {
  id: string;
  fullName: string;
  email: string;
  universityId: string;
  status: "active" | "inactive" | "suspended";
  role: string;
};

export type SearchableBook = {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: "available" | "borrowed" | "reserved";
  totalCopies: number;
  availableCopies: number;
};

export type SearchableOverdue = {
  id: string;
  bookId: string;
  bookTitle: string;
  userId: string;
  userName: string;
  dueDate: string;
  daysOverdue: number;
};

export type SearchableSubscription = {
  id: string;
  userId: string;
  userName: string;
  plan: string;
  status: "active" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
};

// Search data store
export const searchStore = {
  users: [] as SearchableUser[],
  books: [] as SearchableBook[],
  overdueBooks: [] as SearchableOverdue[],
  subscriptions: [] as SearchableSubscription[],
};

// Update functions
export const updateSearchData = {
  users: (users: SearchableUser[]) => {
    searchStore.users = users;
  },
  books: (books: SearchableBook[]) => {
    searchStore.books = books;
  },
  overdueBooks: (overdue: SearchableOverdue[]) => {
    searchStore.overdueBooks = overdue;
  },
  subscriptions: (subscriptions: SearchableSubscription[]) => {
    searchStore.subscriptions = subscriptions;
  },
};

// Search functions
export const searchFunctions = {
  users: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return searchStore.users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        user.universityId.toLowerCase().includes(lowerQuery) ||
        user.role.toLowerCase().includes(lowerQuery)
    );
  },

  books: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return searchStore.books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.genre.toLowerCase().includes(lowerQuery)
    );
  },

  overdueBooks: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return searchStore.overdueBooks.filter(
      (overdue) =>
        overdue.bookTitle.toLowerCase().includes(lowerQuery) ||
        overdue.userName.toLowerCase().includes(lowerQuery)
    );
  },

  subscriptions: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return searchStore.subscriptions.filter(
      (sub) =>
        sub.userName.toLowerCase().includes(lowerQuery) ||
        sub.plan.toLowerCase().includes(lowerQuery)
    );
  },

  all: (query: string) => {
    return {
      users: searchFunctions.users(query),
      books: searchFunctions.books(query),
      overdueBooks: searchFunctions.overdueBooks(query),
      subscriptions: searchFunctions.subscriptions(query),
    };
  },
};