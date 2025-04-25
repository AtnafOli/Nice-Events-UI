import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { MessageBubble } from "./MessageBubble";
import { OptionButton } from "./OptionButton";

import { Message, ConversationFlowState } from "@/lib/chatTypes";
import {
  EVENT_TYPES,
  GUEST_COUNT_RANGES,
  BUDGET_RANGES,
  LOCATION_OPTIONS,
} from "@/lib/chatConstants";
import { getVendorServices } from "@/utils/vendorService";

interface ChatBodyProps {
  messages: Message[];
  currentFlowState: ConversationFlowState;
  isLoading: boolean;
  optionsLocked: boolean;
  handleOptionSelect: (value: string) => void;
}

export const ChatBody: React.FC<ChatBodyProps> = ({
  messages,
  currentFlowState,
  isLoading,
  optionsLocked,
  handleOptionSelect,
}) => {
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const [vendorServices, setVendorServices] = useState<string[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (currentFlowState === "ASKING_SERVICE_TYPE") {
      setLoadingServices(true);
      getVendorServices()
        .then((names) => setVendorServices(names))
        .catch(() => setVendorServices([]))
        .finally(() => setLoadingServices(false));
    }
  }, [currentFlowState]);

  const renderOptions = () => {
    if (optionsLocked) return null;

    let options: string[] = [];

    switch (currentFlowState) {
      case "ASKING_EVENT_TYPE":
        options = EVENT_TYPES;
        break;
      case "ASKING_GUEST_COUNT":
        options = GUEST_COUNT_RANGES;
        break;
      case "ASKING_SERVICE_TYPE":
        options = loadingServices ? [] : vendorServices;
        break;
      case "ASKING_BUDGET":
        options = BUDGET_RANGES;
        break;
      case "ASKING_LOCATION":
        options = LOCATION_OPTIONS;
        break;
      default:
        break;
    }

    return (
      <motion.div
        key={currentFlowState + "-options"}
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-wrap gap-2 justify-start pl-2 pt-2"
      >
        {loadingServices && currentFlowState === "ASKING_SERVICE_TYPE" ? (
          <span className="text-sm italic text-muted-foreground/70">
            Loading services…
          </span>
        ) : (
          options.map((option) => (
            <OptionButton
              key={option}
              onClick={() => handleOptionSelect(option)}
              disabled={optionsLocked}
            >
              {option}
            </OptionButton>
          ))
        )}
      </motion.div>
    );
  };

  return (
    <div
      ref={chatBodyRef}
      className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 bg-background"
    >
      {/* Animate presence for message bubbles */}
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </AnimatePresence>

      {/* Options below messages */}
      {renderOptions()}

      {/* “Thinking” loader */}
      {isLoading && currentFlowState === "PROCESSING" && (
        <motion.div
          key="loading-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="p-3 rounded-xl max-w-[80%] text-sm leading-relaxed shadow-sm bg-muted text-muted-foreground rounded-bl-none flex items-center gap-2">
            <span className="text-muted-foreground/80">Thinking</span>
            <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce" />
          </div>
        </motion.div>
      )}
    </div>
  );
};
