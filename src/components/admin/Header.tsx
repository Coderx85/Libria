"use client";
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaBook, FaClock, FaBookmark } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { searchFunctions } from "@/lib/search";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const Header = ({ session }: { session: Session }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const searchResults = searchTerm ? searchFunctions.all(searchTerm) : null;

  return (
    <header className="admin-header">
      <div>
        <h2 className="text-3xl font-semibold text-light-100">
          {session?.user?.name}
        </h2>
        <p className="text-base text-light-400">
          Monitor all of your users and books here
        </p>
      </div>

      <div className="relative mt-5 flex items-center justify-end gap-3">
        <div className="relative w-full max-w-[400px]">
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            size="sm"
            className={cn(
              "relative w-full justify-start text-sm text-muted-foreground",
              "bg-dark-300 hover:bg-dark-200",
              "border-input/20 hover:border-input/40"
            )}
          >
            <FaSearch className="mr-2 h-4 w-4" />
            <span>Search everything...</span>
            <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-dark-400 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type to search..."
          value={searchTerm}
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchResults && (
            <>
              {searchResults.users.length > 0 && (
                <CommandGroup heading="Users">
                  {searchResults.users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.fullName}
                      onSelect={() => {
                        window.location.href = `/admin/users?id=${user.id}`;
                        setOpen(false);
                      }}
                    >
                      <FaUser className="mr-2 h-4 w-4 text-light-500" />
                      <span>{user.fullName}</span>
                      <CommandShortcut>{user.email}</CommandShortcut>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {searchResults.books.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Books">
                    {searchResults.books.map((book) => (
                      <CommandItem
                        key={book.id}
                        value={book.title}
                        onSelect={() => {
                          window.location.href = `/admin/books?id=${book.id}`;
                          setOpen(false);
                        }}
                      >
                        <FaBook className="mr-2 h-4 w-4 text-light-500" />
                        <span>{book.title}</span>
                        <CommandShortcut>{book.author}</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {searchResults.overdueBooks.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Overdue Books">
                    {searchResults.overdueBooks.map((item) => (
                      <CommandItem
                        key={item.id}
                        value={item.bookTitle}
                        onSelect={() => {
                          window.location.href = `/admin/books?overdue=${item.id}`;
                          setOpen(false);
                        }}
                      >
                        <FaClock className="mr-2 h-4 w-4 text-red-400" />
                        <span>{item.bookTitle}</span>
                        <CommandShortcut>{item.daysOverdue} days overdue</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {searchResults.subscriptions.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Subscriptions">
                    {searchResults.subscriptions.map((sub) => (
                      <CommandItem
                        key={sub.id}
                        value={sub.userName}
                        onSelect={() => {
                          window.location.href = `/admin/subscriptions?id=${sub.id}`;
                          setOpen(false);
                        }}
                      >
                        <FaBookmark className="mr-2 h-4 w-4 text-light-500" />
                        <span>{sub.userName}</span>
                        <CommandShortcut>{sub.plan}</CommandShortcut>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Header;