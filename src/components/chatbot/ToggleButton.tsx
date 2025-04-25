import React from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isOpen,
  onClick,
}) => {
  return (
    <motion.button
      key="toggle-button"
      onClick={onClick}
      className="bg-primary text-primary-foreground p-3.5 sm:p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary transition-all"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {/* Icon changes instantly */}
      {isOpen ? <IoClose size={24} /> : <BsChatDotsFill size={24} />}
    </motion.button>
  );
};
