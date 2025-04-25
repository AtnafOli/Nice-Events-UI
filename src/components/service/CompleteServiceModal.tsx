"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ServiceRequest } from "@/types/service-request";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface CompleteServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const CompleteServiceModal: React.FC<CompleteServiceModalProps> = ({
  isOpen,
  onClose,
  request,
  onConfirm,
  isLoading,
}) => {
  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Service Completion</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark the service for{" "}
            <span className="font-semibold">{`${request.firstName} ${request.lastName}`}</span>{" "}
            (Event Date:{" "}
            <span className="font-semibold">
              {format(new Date(request.eventDate), "PPP")}
            </span>
            ) as completed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-start">
          {" "}
          {/* Adjusted footer alignment */}
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Completing...
              </>
            ) : (
              "Confirm Completion"
            )}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isLoading}>
              {" "}
              {/* Added type="button" */}
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteServiceModal;
