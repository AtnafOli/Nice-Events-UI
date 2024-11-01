"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FiMenu,
  FiChevronDown,
  FiBell,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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

const Sidebar = ({ links, logo, brandName, user }: SidebarProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

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

  const renderNavLink = (link: SidebarLinkItem, mobile: boolean = false) => {
    if (link.subLinks) {
      return (
        <Collapsible
          open={openSubMenus.includes(link.href)}
          onOpenChange={() => toggleSubMenu(link.href)}
          className="w-full"
        >
          <CollapsibleTrigger className="w-full">
            <div
              className={cn(
                "flex items-center justify-between w-full p-3 rounded-xl",
                "transition-all duration-300 ease-out",
                "hover:bg-accent/50 hover:text-accent-foreground",
                "active:scale-[0.98]",
                isLinkActive(link.href)
                  ? "bg-gradient-to-r from-primary/20 via-primary/15 to-transparent text-primary font-medium shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                {link.icon && <span className="text-lg">{link.icon}</span>}
                <span className="text-sm font-medium tracking-wide">
                  {link.label}
                </span>
                {link.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs bg-primary/10 text-primary font-semibold px-2.5"
                  >
                    {link.badge}
                  </Badge>
                )}
              </div>
              <FiChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  openSubMenus.includes(link.href) && "rotate-180"
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 space-y-1 mt-1">
            {link.subLinks.map((subLink) => (
              <Link
                key={subLink.href}
                href={subLink.href}
                onClick={() => mobile && setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm",
                  "transition-all duration-300 ease-out",
                  "hover:bg-accent/50 hover:text-accent-foreground",
                  "active:scale-[0.98]",
                  isLinkActive(subLink.href)
                    ? "bg-gradient-to-r from-primary/20 via-primary/15 to-transparent text-primary font-medium shadow-sm"
                    : "text-muted-foreground"
                )}
              >
                {subLink.icon && (
                  <span className="text-lg">{subLink.icon}</span>
                )}
                <span className="tracking-wide">{subLink.label}</span>
                {subLink.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs bg-primary/10 text-primary font-semibold px-2.5"
                  >
                    {subLink.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Link
        href={link.href}
        onClick={() => mobile && setIsOpen(false)}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm",
          "transition-all duration-300 ease-out",
          "hover:bg-accent/50 hover:text-accent-foreground",
          "active:scale-[0.98]",
          isLinkActive(link.href)
            ? "bg-gradient-to-r from-primary/20 via-primary/15 to-transparent text-primary font-medium shadow-sm"
            : "text-muted-foreground",
          "group relative"
        )}
      >
        {link.icon && <span className="text-lg">{link.icon}</span>}
        <span className="tracking-wide">{link.label}</span>
        {link.badge && (
          <Badge
            variant="secondary"
            className="ml-auto text-xs bg-primary/10 text-primary font-semibold px-2.5"
          >
            {link.badge}
          </Badge>
        )}
        {isLinkActive(link.href) && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary via-primary to-primary/50 rounded-r-full" />
        )}
      </Link>
    );
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <div className="flex items-center justify-between px-4 h-16 bg-background/80 backdrop-blur-xl border-b">
          <div className="flex items-center gap-3">
            {logo}
            <span className="font-semibold text-base tracking-wide">
              {brandName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-accent/50"
            >
              <FiBell className="h-4 w-4" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:bg-accent/50"
                >
                  <FiMenu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 p-0 bg-background/80 backdrop-blur-xl"
              >
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="flex items-center gap-3 text-base">
                    {logo}
                    <span className="font-semibold tracking-wide">
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
                  {user && (
                    <div className="p-3 border-t bg-accent/5">
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-10 w-10 ring-2 ring-border">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-sm bg-primary/5 text-primary font-medium">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold tracking-wide truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col fixed h-screen w-80 border-r bg-background/80 backdrop-blur-xl">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            {logo}
            <span className="text-lg font-semibold tracking-wide">
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

          {user && (
            <div className="mt-auto pt-3 border-t">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start px-2 hover:bg-accent/50 rounded-xl h-auto py-2"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 ring-2 ring-border">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-sm bg-primary/5 text-primary font-medium">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold tracking-wide truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-xl"
                  sideOffset={8}
                >
                  <DropdownMenuItem className="gap-3 rounded-lg">
                    <FiSettings className="h-4 w-4" />
                    <span className="text-sm font-medium">Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-3 text-destructive focus:text-destructive rounded-lg">
                    <FiLogOut className="h-4 w-4" />
                    <span className="text-sm font-medium">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>

      <div className="lg:pl-80">
        <div className="h-16 lg:h-0" />
      </div>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 20px;
        }

        @supports (backdrop-filter: blur(0px)) {
          .custom-scrollbar::-webkit-scrollbar-thumb {
            backdrop-filter: blur(8px);
            background-color: rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
