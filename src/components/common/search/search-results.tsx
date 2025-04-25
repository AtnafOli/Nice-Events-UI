"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { ServicesResponse } from "@/services/services.service";

interface SearchResultsProps {
  searchQuery: string;
  searchResults: ServicesResponse["data"];
  isLoading: boolean;
  handleSearchItemClick: (id: number) => void;
}

const SearchResults = forwardRef<HTMLDivElement, SearchResultsProps>(
  ({ searchQuery, searchResults, isLoading, handleSearchItemClick }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute top-full mt-1 w-full bg-background/95 backdrop-blur-md rounded-lg border border-primary/20 shadow-lg z-50 max-h-[60vh] overflow-y-auto"
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {searchResults.length > 0 ? (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-medium text-muted-foreground border-b border-primary/10">
                  {searchResults.length} results for "{searchQuery}"
                </div>
                {searchResults.map((result) => (
                  <motion.div
                    key={result.id}
                    whileHover={{
                      backgroundColor: "rgba(var(--primary-rgb), 0.1)",
                    }}
                    className="px-4 py-3 cursor-pointer border-b border-primary/5 last:border-0"
                    onClick={() => handleSearchItemClick(result.id)}
                  >
                    <div className="flex items-center">
                      {result.images?.[0]?.imageUrl && (
                        <div className="flex-shrink-0 mr-3 overflow-hidden rounded-md">
                          <Image
                            src={result.images[0].imageUrl}
                            alt={result.name}
                            width={40}
                            height={40}
                            className="object-cover transition-transform hover:scale-110 duration-300"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-foreground">
                          {result.name}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center">
                          {result.vendor?.address.city && (
                            <span className="ml-2 px-1.5 py-0.5 bg-primary/10 rounded-full text-xs">
                              {result.vendor.address.city}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                {isLoading ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin mb-2">
                      <Search className="h-5 w-5" />
                    </div>
                    <p>Searching...</p>
                  </div>
                ) : (
                  <p>No results found for "{searchQuery}"</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

SearchResults.displayName = "SearchResults";

export default SearchResults;
