"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import SearchResults from "./search-results";
import { ServicesResponse } from "@/services/services.service";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: ServicesResponse["data"];
  isLoading: boolean;
  showResults: boolean;
  setShowResults: (show: boolean) => void;
  handleSearchItemClick: (id: number) => void;
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  searchResults,
  isLoading,
  showResults,
  setShowResults,
  handleSearchItemClick,
}: SearchBarProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        resultsRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowResults]);

  return (
    <div className="hidden md:flex relative" ref={searchRef}>
      <motion.div
        initial={false}
        animate={{
          width: isFocused ? "350px" : "290px",
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
        className="group relative w-full origin-right"
      >
        <div className="relative flex items-center overflow-hidden rounded-full backdrop-blur-sm transition-all duration-300 bg-gradient-to-r from-background/80 to-background/60 border border-primary/20 shadow-sm group-hover:shadow-md group-hover:border-primary/40">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            <Search
              className={`h-4 w-4 transition-all ${
                isLoading
                  ? "text-primary animate-pulse"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            />
          </div>
          <input
            type="text"
            placeholder="Search services..."
            className="w-full bg-transparent border-none text-sm placeholder:text-muted-foreground py-3 pl-10 pr-10 focus:outline-none focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              if (searchResults.length > 0) setShowResults(true);
            }}
            onBlur={() => setIsFocused(false)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                setSearchQuery("");
                setShowResults(false);
                setIsFocused(false);
              }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="absolute bottom-0 left-0 h-[1.5px] w-full transform scale-x-0 origin-left transition-transform duration-300 bg-gradient-to-r from-primary to-primary/50 group-hover:scale-x-100" />
        </div>
      </motion.div>

      {/* Search Results Dropdown */}
      {showResults && (
        <SearchResults
          ref={resultsRef}
          searchQuery={searchQuery}
          searchResults={searchResults}
          isLoading={isLoading}
          handleSearchItemClick={handleSearchItemClick}
        />
      )}
    </div>
  );
}
