import React from "react";
import { motion } from "framer-motion";
import { Message } from "@/lib/chatTypes";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { type, text } = message;

  const alignmentClass = type === "user" ? "justify-end" : "justify-start";
  const bubbleClass = `p-2.5 sm:p-3 rounded-xl max-w-[85%] sm:max-w-[80%] text-sm leading-relaxed shadow-sm ${
    type === "user"
      ? "bg-primary text-primary-foreground rounded-br-none"
      : type === "bot"
      ? "bg-muted text-muted-foreground rounded-bl-none"
      : // Use accent for info messages for better visibility
        "bg-accent/10 text-accent-foreground border border-accent/20 rounded-lg italic text-center w-full mx-auto max-w-[90%] text-xs sm:text-sm p-2"
  }`;

  return (
    <motion.div
      layout // Animate layout changes smoothly
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: type === "user" ? 10 : -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${alignmentClass}`}
    >
      <div className={bubbleClass}>
        {/* Basic line break handling */}
        {text.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </motion.div>
  );
};
