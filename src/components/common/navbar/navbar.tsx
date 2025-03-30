"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Search, Menu, X, User, Heart, Bell, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/userContext";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import type {
  MobileMenuProps,
  NavButtonProps,
  NavLinkProps,
} from "@/types/navbar";
import { authService } from "@/services/auth.service";
import UserMenu from "../usermenu";

const links = [
  { name: "Services", href: "/services" },
  { name: "Event Planners", href: "/planners" },
  { name: "Venues", href: "/venues" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
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
        ? "bg-background/95 backdrop-blur-xl shadow-md border-b border-primary/10"
        : "bg-transparent"
    }`}
    >
      <div className="max-w-[1580px] mx-auto px-2 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-5">
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
              <AnimatePresence>
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
              </AnimatePresence>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <motion.div
              initial={false}
              animate={{
                width: isSearchFocused ? "350px" : "290px",
                opacity: 1,
              }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center bg-background/80 rounded-full border border-primary/20 p-0.5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Search className="h-5 w-5 text-muted-foreground ml-3" />
              <Input
                type="text"
                placeholder="Search vendors, planners..."
                className="bg-transparent border-none text-sm placeholder:text-muted-foreground w-full py-1.5 px-3 focus:ring-transparent focus-visible:ring-transparent"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </motion.div>
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

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden hover:bg-primary/10 transition-colors duration-200 rounded-full border border-transparent hover:border-primary/20"
                  aria-label="Toggle navigation menu"
                >
                  <AnimatePresence mode="wait" initial={false}>
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
                  </AnimatePresence>
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
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  active,
  onClick,
  isScrolled,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
  >
    <Link
      href={href}
      className={`relative text-md font-medium ${
        isScrolled ? "text-foreground" : "text-primary"
      } transition-all duration-300 hover:text-primary focus:text-primary focus:outline-none rounded-full px-4 py-2 overflow-hidden`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute inset-0 bg-primary/20 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-primary transition-all duration-300"
        whileHover={{ width: "60%" }}
      />
    </Link>
  </motion.div>
);

const NavButton: React.FC<NavButtonProps> = ({ children, variant }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      variant={variant}
      className={`hidden md:inline-flex rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
        variant === "default"
          ? "shadow-sm hover:shadow-md bg-primary text-primary-foreground border border-primary/20"
          : "hover:bg-primary/10 border border-transparent hover:border-primary/20"
      }`}
    >
      {children}
    </Button>
  </motion.div>
);

const MobileMenu: React.FC<MobileMenuProps> = ({
  links,
  activeLink,
  setActiveLink,
  setIsMenuOpen,
  user,
  handleNavigate,
}) => (
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
      <div className="flex items-center bg-background/80 rounded-full border border-primary/20 px-3 py-1.5 mb-6 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Input
          type="text"
          placeholder="Search vendors, planners..."
          className="bg-transparent border-0 text-sm placeholder-muted-foreground w-full py-1.5 px-3 focus-visible:ring-transparent"
        />
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
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start rounded-lg border border-primary/20 hover:bg-primary/10 transition-all duration-300"
          >
            <Heart className="mr-2 h-4 w-4" />
            <span>Favorites</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start rounded-lg border border-primary/20 hover:bg-primary/10 transition-all duration-300"
          >
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </Button>
          <Button
            variant="default"
            className="w-full justify-start rounded-lg mt-2 bg-primary/90 hover:bg-primary transition-all duration-300"
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
            onClick={() => handleNavigate("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            variant="default"
            className="w-full rounded-lg bg-primary/90 hover:bg-primary transition-all duration-300"
            onClick={() => handleNavigate("/sign-up")}
          >
            Register
          </Button>
        </>
      )}
    </div>
  </div>
);
