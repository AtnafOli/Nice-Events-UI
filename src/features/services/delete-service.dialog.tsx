import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Service } from "@/types/service";
import React from "react";

interface DeleteServiceDialogProps {
  service: Service;
  onDelete: (id: number) => void;
  children: React.ReactNode;
}

const DeleteServiceDialog: React.FC<DeleteServiceDialogProps> = ({
  service,
  onDelete,
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg shadow-lg bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Delete Service
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Are you sure you want to delete <strong>{service.name}</strong> from
            the NiceEvents service directory? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              onDelete(service.id);
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete Service
          </Button>
          <Button
            variant="secondary"
            className="text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServiceDialog;
