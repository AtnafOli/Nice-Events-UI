import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Import these components, hook, and types from their respective paths
import { useChatFlow } from "@/hooks/useChatFlow";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody"; // This component is defined above
import { ChatInput } from "./ChatInput";

interface ChatWindowProps {
  onClose: () => void;
  isMobile: boolean;
  initialTab?: "vendor" | "event"; // Allow setting initial tab
}

// Animation variants for the chat window based on device type
const mobileVariants = {
  hidden: { opacity: 0, y: "100%" }, // Starts off-screen below
  visible: {
    opacity: 1,
    y: 0, // Slides up
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }, // Custom ease for entry
  },
  exit: {
    opacity: 0,
    y: "100%", // Slides back off-screen below
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] }, // Custom ease for exit
  },
};

const desktopVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 }, // Starts slightly faded, lower, and smaller
  visible: {
    opacity: 1,
    y: 0, // Moves to final position
    scale: 1, // Scales to full size
    transition: { duration: 0.3, ease: "easeOut" }, // Smooth ease for entry
  },
  exit: {
    opacity: 0,
    y: 20, // Moves slightly lower
    scale: 0.95, // Scales slightly smaller
    transition: { duration: 0.2, ease: "easeIn" }, // Smooth ease for exit
  },
};

export const ChatWindow: React.FC<ChatWindowProps> = ({
  onClose,
  isMobile,
  initialTab = "vendor", // Default initial tab
}) => {
  // Use the custom hook for managing chat logic and state
  const {
    activeTab,
    setActiveTab,
    currentFlowState,
    messages,
    isLoading,
    optionsLocked,
    handleOptionSelect,
    handleTextInputSubmit,
    // startFlow, // Can be used here if needed for manual resets, but hook likely handles tab change
  } = useChatFlow(initialTab); // Pass initialTab to the hook

  // State for the message input field
  const [messageInput, setMessageInput] = useState("");

  // Handle sending message action (button click or Enter key)
  const handleSendAction = () => {
    if (messageInput.trim()) {
      // Prevent sending empty messages
      handleTextInputSubmit(messageInput);
      setMessageInput(""); // Clear input after sending
    }
  };

  // Handle key press in the input field
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check for Enter key without Shift key pressed
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent default form submission or new line
      handleSendAction(); // Trigger send action
    }
  };

  return (
    // Main container for the chat window with Framer Motion animations
    <motion.div
      key="chat-window" // Key for Framer Motion to track presence
      variants={isMobile ? mobileVariants : desktopVariants} // Apply variants based on device
      initial="hidden" // Start in the 'hidden' state
      animate="visible" // Animate to the 'visible' state
      exit="exit" // Animate to the 'exit' state when removed
      className="w-full h-full sm:w-96 sm:h-[600px] bg-card shadow-2xl flex flex-col border border-border/10
                 fixed bottom-0 left-0 right-0 rounded-t-2xl
                 sm:static sm:bottom-auto sm:left-auto sm:right-auto sm:rounded-2xl
                 overflow-hidden" // Hide content that overflows the rounded corners
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
        isLoading={isLoading} // Pass loading state to potentially disable input
        currentFlowState={currentFlowState} // Pass flow state
      />
    </motion.div>
  );
};
