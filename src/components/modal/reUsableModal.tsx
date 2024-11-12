import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showIcon?: boolean;
  colorClassName?: string;
  bgClassName?: string;
  iconComponent?: React.ComponentType<any>;
  iconClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
}

const sizeConfig = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export const MyModal: React.FC<MyModalProps> = ({
  isOpen,
  children,
  onClose,
  title,
  size = "md",
  showIcon = true,
  colorClassName,
  bgClassName,
  iconComponent: Icon,
  iconClassName,
  titleClassName,
  contentClassName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`flex items-center justify-center ${
          sizeConfig[size]
        } mx-auto rounded-lg p-8 shadow-2xl ${bgClassName} ${
          contentClassName || ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="relative w-full flex flex-col items-center"
        >
          <DialogHeader className="w-full flex items-start space-x-4">
            {showIcon && (
              <div
                className={`rounded-full ${colorClassName || ""} p-2 ${
                  iconClassName || ""
                }`}
              >
                {Icon && <Icon className="h-6 w-6" />}
              </div>
            )}
            <div className="flex-1 text-center">
              <DialogTitle
                className={`text-lg font-semibold ${colorClassName || ""} ${
                  titleClassName || ""
                }`}
              >
                {title}
              </DialogTitle>
              <div className="mt-4 text-gray-700 text-center">{children}</div>
            </div>
          </DialogHeader>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
