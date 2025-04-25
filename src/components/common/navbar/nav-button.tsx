"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface NavButtonProps {
  children: React.ReactNode;
  variant:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
}

export default function NavButton({ children, variant }: NavButtonProps) {
  return (
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
}
