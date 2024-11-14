import { User } from "../api";

export interface LinkItem {
  name: string;
  href: string;
}

export interface UserType {
  name: string;
  profileUrl?: string;
  initials: string;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  isScrolled: boolean;
}

export interface NavButtonProps {
  children: React.ReactNode;
  variant: "default" | "ghost";
}

export interface UserMenuProps {
  user: User;
  handleNavigate: (path: string) => void;
  handleLogout: () => void;
}

export interface MobileMenuProps {
  links: LinkItem[];
  activeLink: string;
  setActiveLink: (link: string) => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  user: User | null;
  handleNavigate: (path: string) => void;
}
