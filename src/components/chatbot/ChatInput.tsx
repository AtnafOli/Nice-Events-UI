import React from "react";
import { IoSend } from "react-icons/io5";
import { ConversationFlowState } from "@/lib/chatTypes";

interface ChatInputProps {
  message: string;
  setMessage: (value: string) => void;
  handleSendAction: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  currentFlowState: ConversationFlowState;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  handleSendAction,
  handleKeyPress,
  isLoading,
  currentFlowState,
}) => {
  const isInputDisabled =
    isLoading || !["ASKING_LOCATION", "READY"].includes(currentFlowState);
  const isButtonDisabled =
    isLoading ||
    !["ASKING_LOCATION", "READY"].includes(currentFlowState) ||
    !message.trim();

  const placeholderText = isLoading
    ? "Please wait..."
    : currentFlowState === "ASKING_LOCATION"
    ? "Enter location..."
    : currentFlowState === "PROCESSING"
    ? "Ask anything else..."
    : "Select an option above...";

  return (
    <div className="p-3 sm:p-4 border-t border-border/20 bg-card flex-shrink-0">
      <div className="flex items-center gap-2 sm:gap-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isInputDisabled}
          className="flex-1 px-4 py-2 border border-border/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent bg-background/70 text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-muted/50"
          placeholder={placeholderText}
        />
        <button
          onClick={handleSendAction}
          disabled={isButtonDisabled}
          className="bg-primary text-primary-foreground p-2 sm:p-2.5 rounded-full hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card disabled:opacity-50 disabled:cursor-not-allowed shrink-0 transition-all duration-200 ease-out hover:scale-105 active:scale-95"
          aria-label="Send message"
        >
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};
