import React from "react";

interface OptionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  onClick,
  children,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-secondary"
    >
      {children}
    </button>
  );
};
