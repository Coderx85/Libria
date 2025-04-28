"use client";
import { Session } from "next-auth";
import { Input } from "../ui/input";
// import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Header = ({ session }: { session: Session }) => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const debouncedSearchTerm = useDebounce<string>(searchTerm, 3);
  // const [isSearching, setIsSearching] = useState<boolean>(false);
  return (
    <header className="admin-header">
      <div >
        <h2 className="text-3xl font-semibold text-light-100">
          {session?.user?.name}
        </h2>
        <p className="text-base text-light-400">
          Monitor all of your users and books here
        </p>
      </div>

      <div className="relative mt-5 flex items-center justify-end gap-3">
        <Input 
          type="text"
          placeholder="Search..."
          className="w-full max-w-[400px] border-0 bg-dark-300 text-light-200"
          onChange={(e) => console.log(e.target.value)}
        />
        <div className="absolute right-3 top-2/">
          <FaSearch className="text-gray-500 backdrop-blur-lg" />
        </div>
      </div>
    </header>
  );
};
export default Header;

// function useDebounce<T>(searchTerm: string, arg1: number) {
//   throw new Error("Function not implemented.");
// }