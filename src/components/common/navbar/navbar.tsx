"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Search, Menu, X, User, Heart, Bell, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/userContext";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import {
  MobileMenuProps,
  NavButtonProps,
  NavLinkProps,
  UserMenuProps,
} from "@/types/navbar";
import { authService } from "@/services/auth.service";

const links = [
  { name: "Vendors", href: "/vendors" },
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out z-50
        ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-5">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 mr-8 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Image
                  src="/logo.webp"
                  alt="Luxe Event Connections Logo"
                  width={180}
                  height={32}
                  className="h-12 lg:h-[74px] w-auto transition-opacity duration-300 group-hover:opacity-80"
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
              className="hidden md:flex items-center bg-muted/80 rounded-full border-none p-0.5  transition-all duration-300"
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
                  className="lg:hidden hover:bg-primary/10 transition-colors duration-200 rounded-full"
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
                        <X className="h-16 w-16 text-foreground" />
                      ) : (
                        <Menu className="h-16 w-auto text-foreground " />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[335px] bg-background text-foreground rounded-l-2xl"
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
          className="absolute inset-0 bg-primary/10 rounded-full"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      <motion.div
        className="absolute inset-0 bg-primary opacity-0 transition-opacity duration-300"
        whileHover={{ opacity: 0.1 }}
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
          ? "shadow-sm hover:shadow-md bg-primary text-primary-foreground"
          : "hover:bg-primary/10"
      }`}
    >
      {children}
    </Button>
  </motion.div>
);

const UserMenu: React.FC<UserMenuProps> = ({
  user,
  handleNavigate,
  handleLogout,
}) => {
  const menuItems = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Heart, label: "Favorites", path: "/favorites" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-14 w-14 rounded-full overflow-hidden transition-transform hover:scale-105 focus:ring-0 border border-primary/30"
        >
          <Avatar className="h-14 w-14">
            {user.Profile && (
              <AvatarImage
                src={user?.Profile?.avatarUrl || "/placeholder-user.jpg"}
                alt={user?.name}
                className="object-cover"
              />
            )}
            <AvatarFallback className="bg-gradient-to-br from-primary-400 to-primary-600 w-full h-full text-primary font-medium">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "UN"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
        align="end"
        forceMount
      >
        <div className="px-2 py-3 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {user?.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user?.email}
          </p>
        </div>

        <div className="py-2">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <DropdownMenuItem key={path} className="px-1 py-0.5">
              <button
                onClick={() => handleNavigate(path)}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-150"
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            </DropdownMenuItem>
          ))}
        </div>

        <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
          <DropdownMenuItem className="px-1 py-0.5">
            <button
              onClick={() => handleLogout()}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
            >
              <LogOut className="h-4 w-4" />
              <span className="font-medium">Log out</span>
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({
  links,
  activeLink,
  setActiveLink,
  setIsMenuOpen,
  user,
  handleNavigate,
}) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between py-4 px-1 border-b border-border">
      <Image
        src="/logo.webp"
        alt="Luxe Event Connections Logo"
        width={140}
        height={28}
        className="h-12 w-auto"
      />
    </div>
    <div className="py-4">
      <div className="flex items-center bg-muted/80 rounded-full px-3 py-1.5 mb-6">
        <Search className="h-4 w-4 text-muted-foreground mr-2" />
        <Input
          type="text"
          placeholder="Search vendors, planners..."
          className="bg-transparent border-0 text-sm placeholder-muted-foreground w-full py-1.5 px-3 focus-visible:ring-transparent"
        />
      </div>
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`block text-sm font-medium px-3 py-2 rounded-lg ${
              activeLink === link.name
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted hover:text-muted-foreground"
            }`}
            onClick={() => {
              setActiveLink(link.name);
              setIsMenuOpen(false);
            }}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
    <div className="flex flex-col gap-2 py-4 mt-auto">
      {user ? (
        <>
          <Button variant="outline" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Heart className="mr-2 h-4 w-4" />
            <span>Favorites</span>
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notifications</span>
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleNavigate("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            variant="default"
            className="w-full"
            onClick={() => handleNavigate("/sign-up")}
          >
            Register
          </Button>
        </>
      )}
    </div>
  </div>
);
