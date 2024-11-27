"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Menu,
  ChevronDown,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authService } from "@/services/auth.service";

interface SidebarLinkItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  subLinks?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    badge?: string;
  }[];
}

interface SidebarProps {
  links: SidebarLinkItem[];
  logo?: React.ReactNode;
  brandName?: string;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Sidebar({
  links,
  logo,
  brandName,
  user,
}: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleSubMenu = (href: string) => {
    setOpenSubMenus((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  const isLinkActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    await authService.signOut();
    window.location.href = "/";
  };

  const renderNavLink = (link: SidebarLinkItem, mobile: boolean = false) => {
    if (link.subLinks) {
      return (
        <Collapsible
          open={openSubMenus.includes(link.href)}
          onOpenChange={() => toggleSubMenu(link.href)}
          className="w-full"
        >
          <CollapsibleTrigger className="w-full">
            <motion.div
              className={cn(
                "flex items-center justify-between w-full p-2 rounded-lg",
                "transition-all duration-200 ease-out",
                "hover:bg-accent/10 hover:text-accent-foreground",
                isLinkActive(link.href)
                  ? "bg-accent/20 text-accent-foreground font-medium"
                  : "text-muted-foreground"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                {link.icon && <span className="text-lg">{link.icon}</span>}
                <span className="text-base font-medium">{link.label}</span>
                {link.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs bg-primary/10 text-primary"
                  >
                    {link.badge}
                  </Badge>
                )}
              </div>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openSubMenus.includes(link.href) && "rotate-90"
                )}
              />
            </motion.div>
          </CollapsibleTrigger>
          <AnimatePresence>
            {openSubMenus.includes(link.href) && (
              <CollapsibleContent
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="pl-4 space-y-1 mt-1"
              >
                {link.subLinks.map((subLink) => (
                  <motion.div
                    key={subLink.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={subLink.href}
                      onClick={() => mobile && setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
                        "transition-all duration-200 ease-out",
                        "hover:bg-accent/10 hover:text-accent-foreground",
                        isLinkActive(subLink.href)
                          ? "bg-accent/20 text-accent-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      {subLink.icon && (
                        <span className="text-lg">{subLink.icon}</span>
                      )}
                      <span>{subLink.label}</span>
                      {subLink.badge && (
                        <Badge
                          variant="secondary"
                          className="ml-auto text-xs bg-primary/10 text-primary"
                        >
                          {subLink.badge}
                        </Badge>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </CollapsibleContent>
            )}
          </AnimatePresence>
        </Collapsible>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={link.href}
          onClick={() => mobile && setIsOpen(false)}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm",
            "transition-all duration-200 ease-out",
            "hover:bg-accent/10 hover:text-accent-foreground",
            isLinkActive(link.href)
              ? "bg-accent/20 text-accent-foreground font-medium"
              : "text-muted-foreground",
            "group relative"
          )}
        >
          {link.icon && <span className="text-lg">{link.icon}</span>}
          <span>{link.label}</span>
          {link.badge && (
            <Badge
              variant="secondary"
              className="ml-auto text-xs bg-primary/10 text-primary"
            >
              {link.badge}
            </Badge>
          )}
          {isLinkActive(link.href) && (
            <motion.div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
              layoutId="activeIndicator"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </Link>
      </motion.div>
    );
  };

  const renderUserSection = (mobile: boolean = false) => (
    <div
      className={cn(
        "flex flex-col gap-2 p-3",
        mobile
          ? "border-t border-border/50 bg-muted/30 backdrop-blur-lg"
          : "mt-auto pt-3 border-t border-border/50"
      )}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 px-2 hover:bg-accent/10 rounded-lg h-auto py-2"
        onClick={() => {}}
      >
        <User className="h-4 w-4" />
        <span className="text-sm font-medium">Profile</span>
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-3 px-2 hover:bg-accent/10 rounded-lg h-auto py-2 text-destructive hover:text-destructive"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4" />
        <span className="text-sm font-medium">Log out</span>
      </Button>
      {user && (
        <div className="flex items-center gap-3 px-2 mt-2">
          <Avatar className="h-10 w-10 ring-2 ring-border">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-sm bg-primary/10 text-primary font-medium">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 h-16 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center">
            <span className="font-semibold text-base text-primary">
              {brandName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent/10"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-accent/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[280px] sm:w-[350px] p-0 backdrop-blur-xl"
              >
                <SheetHeader className="p-4 border-b border-border/50">
                  <SheetTitle className="flex items-center text-base">
                    <span className="font-semibold text-base text-primary">
                      {brandName}
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-[calc(100vh-4rem)]">
                  <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                    <nav className="space-y-1">
                      {links.map((link) => (
                        <div key={link.href}>{renderNavLink(link, true)}</div>
                      ))}
                    </nav>
                  </div>
                  {renderUserSection(true)}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed h-screen w-72 border-r border-border/80 backdrop-blur-xl transition-all duration-300 ease-in-out">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center">
            <span className="font-extrabold text-2xl text-primary">
              {brandName}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col h-[calc(100vh-5rem)] p-3">
          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
            {links.map((link) => (
              <div key={link.href}>{renderNavLink(link)}</div>
            ))}
          </nav>
          {renderUserSection()}
        </div>
      </div>

      <div className="lg:pl-64 xl:pl-72">
        <div className="h-16 lg:h-0" />
      </div>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: hsl(var(--muted) / 0.3) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: hsl(var(--muted) / 0.3);
          border-radius: 10px;
        }

        @supports (backdrop-filter: blur(0px)) {
          .custom-scrollbar::-webkit-scrollbar-thumb {
            backdrop-filter: blur(8px);
            background-color: hsl(var(--muted) / 0.2);
          }
        }
      `}</style>
    </>
  );
}
