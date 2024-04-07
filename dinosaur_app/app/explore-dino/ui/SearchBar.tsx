"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    push(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative w-80 lg:w-[500px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        type="text"
        placeholder="Search your favourite dinosaur..."
        className="pl-12 pr-4 focus:border-orange-600 focus:outline-0"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("name")?.toString() || "" }
      />
    </div>
  );
};

export default SearchBar;
