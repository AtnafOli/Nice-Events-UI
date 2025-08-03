import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useChatFlow } from "@/hooks/useChatFlow";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatInput } from "./ChatInput";

interface ChatWindowProps {
  onClose: () => void;
  isMobile: boolean;
  initialTab?: "vendor" | "event";
}

const mobileVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

const desktopVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const ChatWindow: React.FC<ChatWindowProps> = ({
  onClose,
  isMobile,
  initialTab = "vendor",
}) => {
  const {
    activeTab,
    setActiveTab,
    currentFlowState,
    messages,
    isLoading,
    optionsLocked,
    handleOptionSelect,
    handleTextInputSubmit,
  } = useChatFlow(initialTab);

  const [messageInput, setMessageInput] = useState("");

  const handleSendAction = () => {
    if (messageInput.trim()) {
      handleTextInputSubmit(messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendAction();
    }
  };

  return (
    <motion.div
      key="chat-window"
      variants={isMobile ? mobileVariants : desktopVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`z-50 bg-card shadow-2xl flex flex-col border border-border/10
    ${
      isMobile
        ? "fixed bottom-4 left-4 right-4 h-[70%] rounded-2xl"
        : "md:w-96 md:h-[80%] md:rounded-2xl md:static"
    }
    overflow-hidden`}
    >
      {/* Chat Header component */}
      <ChatHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onClose}
      />
      {/* Chat Body component - contains messages and handles scrolling */}
      <ChatBody
        messages={messages}
        currentFlowState={currentFlowState}
        isLoading={isLoading}
        optionsLocked={optionsLocked}
        handleOptionSelect={handleOptionSelect}
      />
      {/* Chat Input component */}
      <ChatInput
        message={messageInput}
        setMessage={setMessageInput}
        handleSendAction={handleSendAction}
        handleKeyPress={handleKeyPress}
        isLoading={isLoading}
        currentFlowState={currentFlowState}
      />
    </motion.div>
  );
};
