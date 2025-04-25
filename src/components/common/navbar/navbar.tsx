"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu, X } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { authService } from "@/services/auth.service";
import { servicesService } from "@/services/services.service";
import UserMenu from "../usermenu";
import GoToManageButton from "@/components/go_to_manage";
import NavLink from "./nav-link";
import NavButton from "./nav-button";
import MobileMenu from "./mobile-menu";
import SearchBar from "../search/search-bar";
import { User, Heart, Bell } from "lucide-react";

const links = [
  { name: "Services", href: "/services" },
  { name: "Event Planners", href: "/planners" },
  { name: "Venues", href: "/venues" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsLoading(true);
        try {
          const results = await servicesService.searchServices(searchQuery);
          setSearchResults(results);
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleSearchItemClick = (id: number) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(`/service/detail/${id}`);
  };

  async function handleLogout() {
    await authService.signOut();
    window.location.href = "/";
  }

  const menuItems = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Heart, label: "Favorites", path: "/favorites" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out z-50
        ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl shadow-sm shadow-primary/30 "
            : "bg-transparent"
        }`}
    >
      <div className="max-w-[1580px] mx-auto px-2 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-3.5">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 mr-8 group relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/logo.png"
                  alt="Luxe Event Connections Logo"
                  width={180}
                  height={32}
                  className="h-8 lg:h-[54px] w-auto"
                />
              </motion.div>
            </Link>
            <nav className="hidden lg:flex space-x-1">
              {links.map((link) => (
                <NavLink
                  key={link.name}
                  href={link.href}
                  active={activeLink === link.name}
                  onClick={() => setActiveLink(link.name)}
                  isScrolled={isScrolled}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              searchResults={searchResults}
              isLoading={isLoading}
              showResults={showResults}
              setShowResults={setShowResults}
              handleSearchItemClick={handleSearchItemClick}
            />

            {user ? (
              <div className="hidden lg:block">
                <UserMenu
                  menuItems={menuItems}
                  user={user}
                  handleNavigate={handleNavigate}
                  handleLogout={handleLogout}
                />
              </div>
            ) : (
              <>
                <div onClick={() => handleNavigate("/sign-in")}>
                  <NavButton variant="ghost">Sign In</NavButton>
                </div>
                <div onClick={() => handleNavigate("/sign-up")}>
                  <NavButton variant="default">Register</NavButton>
                </div>
              </>
            )}

            <GoToManageButton />

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-primary/10 transition-colors duration-200 rounded-full border border-transparent hover:border-primary/20"
                  aria-label="Toggle navigation menu"
                >
                  <motion.div
                    key={isMenuOpen ? "close" : "open"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? (
                      <X className="h-6 w-6 text-foreground" />
                    ) : (
                      <Menu className="h-6 w-6 text-foreground" />
                    )}
                  </motion.div>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[335px] bg-background/95 backdrop-blur-xl text-foreground rounded-l-2xl border-l border-primary/10 shadow-xl"
              >
                <VisuallyHidden>
                  <DialogTitle>Navigation Menu</DialogTitle>
                </VisuallyHidden>
                <MobileMenu
                  links={links}
                  activeLink={activeLink}
                  setActiveLink={setActiveLink}
                  setIsMenuOpen={setIsMenuOpen}
                  user={user}
                  handleNavigate={handleNavigate}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchResults={searchResults}
                  isLoading={isLoading}
                  handleSearchItemClick={handleSearchItemClick}
                  handleLogout={handleLogout}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
