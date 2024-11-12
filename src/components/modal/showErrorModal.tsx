import React, { useEffect } from "react";
import { MyModal } from "./reUsableModal";
import { cn } from "@/lib/utils";

interface ShowModalErrorProps {
  message: string | React.ReactNode;
  isModalOpen: boolean;
  closeModal: () => void;
  type: "error" | "success" | "info" | "warning";
  title: string;
  autoClose?: number;
  className?: string;
  description?: string;
  errorCode?: string | number;
  retryAction?: () => void;
  showIcon?: boolean;
}

const ShowModalError: React.FC<ShowModalErrorProps> = ({
  message,
  isModalOpen,
  closeModal,
  type = "error",
  title,
  autoClose,
  className,
  description,
  errorCode,
  retryAction,
  showIcon = true,
}) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (autoClose && isModalOpen) {
      timeoutId = setTimeout(() => {
        closeModal();
      }, autoClose);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [autoClose, isModalOpen, closeModal]);

  const renderMessage = () => {
    if (typeof message === "string") {
      return (
        <div className={cn("space-y-2", className)}>
          <p className="text-base leading-relaxed">{message}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {errorCode && (
            <p className="text-xs text-muted-foreground">
              Error Code: {errorCode}
            </p>
          )}
        </div>
      );
    }
    return message;
  };

  const renderActions = () => {
    if (!retryAction) return null;

    return (
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={closeModal}
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={retryAction}
          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  };

  return (
    <MyModal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={title}
      showIcon={showIcon}
    >
      <div className="space-y-4">
        {renderMessage()}
        {renderActions()}
      </div>
    </MyModal>
  );
};

export default ShowModalError;
