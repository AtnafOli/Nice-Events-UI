"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Service } from "@/types/service";
import React from "react";

interface DeleteServiceDialogProps {
  service: Service;
  onDelete: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteServiceDialog: React.FC<DeleteServiceDialogProps> = ({
  service,
  onDelete,
  isOpen,
  onClose,
}) => {
  const handleDelete = () => {
    onDelete(service.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] rounded-lg shadow-lg bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Delete Service
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Are you sure you want to delete <strong>{service.name}</strong> from
            the service directory? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="hover:bg-red-700"
          >
            Delete Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
