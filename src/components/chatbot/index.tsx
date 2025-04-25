"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ChatWindow } from "./ChatWindow";
import { ToggleButton } from "./ToggleButton";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed ${
        isOpen && isMobile ? "inset-0" : "bottom-5 right-5"
      } z-[999]`}
    >
      {/* Chat Window appears within the AnimatePresence context */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            key="chat-window-instance"
            onClose={() => setIsOpen(false)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Toggle button visibility logic */}
      {!(isOpen && isMobile) && (
        <ToggleButton isOpen={isOpen} onClick={toggleChat} />
      )}
    </div>
  );
};

export default ChatWidget;
