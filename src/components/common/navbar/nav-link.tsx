"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onClick?: () => void;
  isScrolled: boolean;
}

export default function NavLink({
  href,
  children,
  active,
  onClick,
  isScrolled,
}: NavLinkProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className={`relative text-md font-medium transition-all duration-300 hover:text-primary focus:text-primary focus:outline-none rounded-full px-4 py-2 overflow-hidden`}
        onClick={onClick}
      >
        <span
          className={`relative z-10 ${
            isScrolled ? "text-foreground" : "text-primary"
          }`}
        >
          {children}
        </span>
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
}
