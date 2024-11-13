"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Search, Menu, X, User, Heart, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/userContext";
import { DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const links = [
  { name: "Vendors", href: "/vendors" },
  { name: "Event Planners", href: "/planners" },
  { name: "Venues", href: "/venues" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out
        ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2.5 md:py-4">
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
                  width={140}
                  height={28}
                  className="h-11 lg:h-16 w-auto transition-opacity duration-300 group-hover:opacity-80"
                />
              </motion.div>
            </Link>
            <nav className="hidden md:flex space-x-1">
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
                width: isScrolled ? "auto" : "auto",
                opacity: isScrolled ? 1 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="hidden md:flex items-center bg-muted/80 rounded-full shadow-sm"
            >
              <Search className="h-4 w-4 text-muted-foreground ml-3" />
              <Input
                type="text"
                placeholder="Search vendors, planners..."
                className="bg-transparent border-none text-sm placeholder-muted-foreground w-full py-1.5 px-3 focus-visible:ring-0"
              />
            </motion.div>
            {user ? (
              <>
                <NavIconButton icon={Heart} label="Favorites" />
                <NavIconButton icon={Bell} label="Notifications" />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Avatar className="h-8 w-8 hidden md:flex cursor-pointer">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </motion.div>
              </>
            ) : (
              <>
                <div
                  onClick={() => {
                    handleNavigate("/sign-in");
                  }}
                >
                  <NavButton variant="ghost">
                    <span className="text-base">Sign In</span>
                  </NavButton>
                </div>
                <div
                  onClick={() => {
                    handleNavigate("/sign-up");
                  }}
                >
                  <NavButton variant="default">
                    <span className="text-base">Register</span>
                  </NavButton>
                </div>
              </>
            )}

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-primary/10 transition-colors duration-200 rounded-full"
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
                        <X
                          style={{ width: "12px", height: "12px" }}
                          className="text-foreground"
                        />
                      ) : (
                        <Menu
                          style={{ width: "20px", height: "20px" }}
                          className="text-foreground"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] bg-background text-foreground rounded-tl-xl"
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
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

const NavLink = ({ href, children, active, onClick, isScrolled }) => (
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
      } transition-all duration-300 hover:text-primary focus:text-primary focus:outline-none rounded-full px-3 py-1.5 overflow-hidden`}
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

const NavIconButton = ({ icon: Icon, label }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      variant="ghost"
      size="icon"
      className="hidden md:flex hover:bg-primary/10 transition-colors duration-200 rounded-full"
      aria-label={label}
    >
      <Icon className="h-5 w-5 text-primary" />
    </Button>
  </motion.div>
);

const NavButton = ({ children, variant }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Button
      variant={variant}
      className={`hidden md:inline-flex rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
        variant === "default"
          ? "shadow-sm hover:shadow-md bg-primary text-primary-foreground"
          : "hover:bg-primary/10"
      }`}
    >
      {children}
    </Button>
  </motion.div>
);

const MobileMenu = ({
  links,
  activeLink,
  setActiveLink,
  setIsMenuOpen,
  user,
}) => (
  <div className="flex flex-col h-full">
    <div className="flex items-center justify-between py-4 px-2 border-b border-border">
      <Image
        src="/logo.webp"
        alt="Luxe Event Connections Logo"
        width={120}
        height={24}
        className="h-11 w-auto"
      />
    </div>
    <div className="p-4">
      <div className="flex items-center bg-muted/80 rounded-full px-3 py-1.5 mb-4">
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
    <div className="flex flex-col gap-2 p-4 mt-auto">
      {user ? (
        <>
          <NavIconButton icon={Heart} label="Favorites" />
          <NavIconButton icon={Bell} label="Notifications" />
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </>
      ) : (
        <>
          <NavButton variant="ghost">Sign In</NavButton>
          <NavButton variant="default">Register</NavButton>
        </>
      )}
    </div>
  </div>
);
