"use client";
import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaBook, FaClock, FaBookmark } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Link from "next/link";
import { searchFunctions } from "@/lib/search";
import {
  Command,
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
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          size="sm"
          className={cn(
            "relative w-full max-w-[400px] justify-start text-sm text-muted-foreground",
            "bg-dark-300 hover:bg-dark-200 hover:text-light-100",
            "border-input/20 hover:border-input/40"
          )}
        >
          <FaSearch className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline-flex">Search everything...</span>
          <span className="inline-flex sm:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-dark-400 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-light-500">
            <CommandInput 
              placeholder="Type a command or search..."
              value={searchTerm}
              onValueChange={handleSearch}
              className="border-b border-dark-600 bg-dark-300 text-light-100 placeholder:text-light-500"
            />
            <CommandList className="max-h-[calc(100vh-100px)] overflow-y-auto bg-dark-300">
              <CommandEmpty className="py-6 text-center text-sm text-light-500">
                No results found.
              </CommandEmpty>
              {searchResults && (
                <>
                  {searchResults.users.length > 0 && (
                    <CommandGroup heading="Users" className="text-light-500">
                      {searchResults.users.map((user) => (
                        <CommandItem
                          key={user.id}
                          value={user.fullName}
                          onSelect={() => {
                            window.location.href = `/admin/users?id=${user.id}`;
                            setOpen(false);
                          }}
                          className="hover:bg-dark-400 aria-selected:bg-dark-400 text-light-100"
                        >
                          <FaUser className="mr-2 h-4 w-4 text-light-500" />
                          <span>{user.fullName}</span>
                          <CommandShortcut className="text-light-500">{user.email}</CommandShortcut>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {searchResults.books.length > 0 && (
                    <>
                      <CommandSeparator className="bg-dark-600" />
                      <CommandGroup heading="Books" className="text-light-500">
                        {searchResults.books.map((book) => (
                          <CommandItem
                            key={book.id}
                            value={book.title}
                            onSelect={() => {
                              window.location.href = `/admin/books?id=${book.id}`;
                              setOpen(false);
                            }}
                            className="hover:bg-dark-400 aria-selected:bg-dark-400 text-light-100"
                          >
                            <FaBook className="mr-2 h-4 w-4 text-light-500" />
                            <span>{book.title}</span>
                            <CommandShortcut className="text-light-500">{book.author}</CommandShortcut>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}

                  {searchResults.overdueBooks.length > 0 && (
                    <>
                      <CommandSeparator className="bg-dark-600" />
                      <CommandGroup heading="Overdue Books" className="text-light-500">
                        {searchResults.overdueBooks.map((item) => (
                          <CommandItem
                            key={item.id}
                            value={item.bookTitle}
                            onSelect={() => {
                              window.location.href = `/admin/books?overdue=${item.id}`;
                              setOpen(false);
                            }}
                            className="hover:bg-dark-400 aria-selected:bg-dark-400 text-light-100"
                          >
                            <FaClock className="mr-2 h-4 w-4 text-red-400" />
                            <span>{item.bookTitle}</span>
                            <CommandShortcut className="text-light-500">
                              {item.daysOverdue} days overdue
                            </CommandShortcut>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}

                  {searchResults.subscriptions.length > 0 && (
                    <>
                      <CommandSeparator className="bg-dark-600" />
                      <CommandGroup heading="Subscriptions" className="text-light-500">
                        {searchResults.subscriptions.map((sub) => (
                          <CommandItem
                            key={sub.id}
                            value={sub.userName}
                            onSelect={() => {
                              window.location.href = `/admin/subscriptions?id=${sub.id}`;
                              setOpen(false);
                            }}
                            className="hover:bg-dark-400 aria-selected:bg-dark-400 text-light-100"
                          >
                            <FaBookmark className="mr-2 h-4 w-4 text-light-500" />
                            <span>{sub.userName}</span>
                            <CommandShortcut className="text-light-500">{sub.plan}</CommandShortcut>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  )}
                </>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;