import React from "react";
import { IoClose } from "react-icons/io5";
import { FaConciergeBell, FaLightbulb } from "react-icons/fa";
import { ActiveTab } from "@/lib/chatTypes";

interface ChatHeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  activeTab,
  setActiveTab,
  onClose,
}) => {
  return (
    <div className="bg-primary text-primary-foreground p-3 sm:p-4 flex-shrink-0">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-base sm:text-lg tracking-tight">
          Nice Event Assistant
        </h3>
        <button
          onClick={onClose}
          className="text-primary-foreground/80 hover:text-primary-foreground hover:scale-110 transition-all p-1 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close chat"
        >
          <IoClose size={22} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 sm:gap-2 p-1 bg-primary/80 text-white rounded-lg">
        <button
          onClick={() => setActiveTab("vendor")}
          className={`tab-button ${activeTab === "vendor" ? "active" : ""}`}
        >
          <FaConciergeBell className="shrink-0" />{" "}
          <span className="truncate">Vendor Match</span>
        </button>
        <button
          onClick={() => setActiveTab("event")}
          className={`tab-button ${activeTab === "event" ? "active" : ""}`}
        >
          <FaLightbulb className="shrink-0" />{" "}
          <span className="truncate">Event Advice</span>
        </button>
      </div>
      {/* Basic Tab Styling (add to your global CSS or use @apply) */}
      <style jsx global>{`
        .tab-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem; /* gap-1.5 */
          padding-top: 0.375rem; /* py-1.5 */
          padding-bottom: 0.375rem;
          padding-left: 0.5rem; /* px-2 */
          padding-right: 0.5rem;
          border-radius: 0.375rem; /* rounded-md */
          font-size: 0.75rem; /* text-xs */
          font-weight: 500; /* font-medium */
          transition: all 0.3s ease-out;
          color: rgba(255, 255, 255, 0.7); /* text-primary-foreground/70 */
        }
        .tab-button:hover {
          background-color: rgba(255, 255, 255, 0.1); /* hover:bg-white/10 */
          color: rgba(255, 255, 255, 1); /* hover:text-primary-foreground */
        }
        .tab-button.active {
          background-color: white; /* bg-card - assumes CSS variable */
          /* Use your theme's primary text color */
          color: hsl(var(--primary)); /* text-primary - assumes HSL variable */
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
            0 1px 2px -1px rgb(0 0 0 / 0.1); /* shadow-sm */
        }
        .tab-button:focus {
          outline: none;
          /* Add appropriate focus ring using theme colors */
          /* ring: 1px solid white; */
        }
        /* Responsive adjustments */
        @media (min-width: 640px) {
          /* sm breakpoint */
          .tab-button {
            gap: 0.5rem; /* sm:gap-2 */
            padding-top: 0.5rem; /* sm:py-2 */
            padding-bottom: 0.5rem;
            padding-left: 0.75rem; /* sm:px-3 */
            padding-right: 0.75rem;
            font-size: 0.875rem; /* sm:text-sm */
          }
        }
      `}</style>
    </div>
  );
};
