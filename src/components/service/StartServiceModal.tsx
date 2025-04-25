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

interface StartServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const StartServiceModal: React.FC<StartServiceModalProps> = ({
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
          <DialogTitle>Confirm Start Progress</DialogTitle>
          <DialogDescription>
            Are you sure you want to start the service for{" "}
            <span className="font-semibold">{`${request.firstName} ${request.lastName}`}</span>{" "}
            scheduled for{" "}
            <span className="font-semibold">
              {format(new Date(request.eventDate), "PPP")}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-start">
          {" "}
          {/* Adjusted footer alignment */}
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting...
              </>
            ) : (
              "Confirm Start"
            )}
          </Button>
          {/* Use DialogClose for the Cancel button for standard behavior */}
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

export default StartServiceModal;
