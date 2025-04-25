"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, X, User as UserIcon, Heart, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceResponse, ServicesResponse } from "@/services/services.service";
import { User } from "@/types/api";

interface Link {
  name: string;
  href: string;
}

interface MobileMenuProps {
  links: Link[];
  activeLink: string;
  setActiveLink: (linkName: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  user: User | null;
  handleNavigate: (path: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: ServicesResponse["data"];
  isLoading: boolean;
  handleSearchItemClick: (id: number) => void;
  handleLogout: () => void;
}
export default function MobileMenu({
  links,
  activeLink,
  setActiveLink,
  setIsMenuOpen,
  user,
  handleNavigate,
  searchQuery,
  setSearchQuery,
  searchResults,
  isLoading,
  handleSearchItemClick,
  handleLogout,
}: MobileMenuProps) {
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-4 px-1 border-b border-primary/10">
        <Image
          src="/logo.png"
          alt="Luxe Event Connections Logo"
          width={140}
          height={28}
          className="h-12 w-auto"
        />
      </div>
      <div className="py-4">
        <div className="relative mb-6">
          <div className="relative flex items-center overflow-hidden rounded-full backdrop-blur-sm transition-all duration-300 bg-gradient-to-r from-background/80 to-background/60 border border-primary/20 shadow-sm mb-2">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search
                className={`h-4 w-4 ${
                  isLoading
                    ? "text-primary animate-pulse"
                    : "text-muted-foreground"
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Search vendors, planners..."
              className="w-full bg-transparent border-0 text-sm placeholder:text-muted-foreground py-3 pl-10 pr-10 focus:outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 2) {
                  setShowSearchResults(true);
                } else {
                  setShowSearchResults(false);
                }
              }}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile Search Results */}
          {searchQuery.trim().length > 2 && showSearchResults && (
            <div className="bg-background/95 backdrop-blur-md rounded-lg border border-primary/20 shadow-lg mb-6 max-h-[40vh] overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-medium text-muted-foreground border-b border-primary/10">
                    {searchResults.length} results
                  </div>
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="px-4 py-3 cursor-pointer hover:bg-primary/10 border-b border-primary/5 last:border-0"
                      onClick={() => {
                        handleSearchItemClick(result.id);
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        {result.images && (
                          <div className="flex-shrink-0 mr-3 overflow-hidden rounded-md">
                            <Image
                              src={result.images[0].imageUrl}
                              alt={result.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-foreground">
                            {result.name}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            {result.vendor?.address?.city && (
                              <span className="ml-2 px-1.5 py-0.5 bg-primary/10 rounded-full text-xs">
                                {result.vendor.address.city}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
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
                    <p>No results found</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={link.href}
                className={`block text-sm font-medium px-4 py-2.5 rounded-lg transition-all duration-300 ${
                  activeLink === link.name
                    ? "bg-primary/20 text-primary border-l-2 border-primary"
                    : "hover:bg-primary/10 hover:text-primary border-l-2 border-transparent"
                }`}
                onClick={() => {
                  setActiveLink(link.name);
                  setIsMenuOpen(false);
                }}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-3 py-4 mt-auto">
        {user ? (
          <>
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              onClick={() => {
                handleNavigate("/profile");
                setIsMenuOpen(false);
              }}
            >
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              onClick={() => {
                handleNavigate("/favorites");
                setIsMenuOpen(false);
              }}
            >
              <Heart className="mr-2 h-4 w-4" />
              <span>Favorites</span>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start rounded-lg border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              onClick={() => {
                handleNavigate("/notifications");
                setIsMenuOpen(false);
              }}
            >
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </Button>
            <Button
              variant="default"
              className="w-full justify-start rounded-lg mt-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              className="w-full rounded-lg border border-primary/20 hover:bg-primary/10 transition-all duration-300"
              onClick={() => {
                handleNavigate("/sign-in");
                setIsMenuOpen(false);
              }}
            >
              Sign In
            </Button>
            <Button
              variant="default"
              className="w-full rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
              onClick={() => {
                handleNavigate("/sign-up");
                setIsMenuOpen(false);
              }}
            >
              Register
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
