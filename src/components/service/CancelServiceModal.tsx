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
import { ServiceRequest, ServiceRequestStatus } from "@/types/service-request";
import { format } from "date-fns";
import { Loader2, AlertTriangle } from "lucide-react";

interface CancelServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const CancelServiceModal: React.FC<CancelServiceModalProps> = ({
  isOpen,
  onClose,
  request,
  onConfirm,
  isLoading,
}) => {
  if (!request) return null;

  const currentStatusText = request.status.replace("_", " ").toLowerCase();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />{" "}
            {/* Warning Icon */}
            Confirm Service Cancellation
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel the service requested by{" "}
            <span className="font-semibold">{`${request.firstName} ${request.lastName}`}</span>{" "}
            for{" "}
            <span className="font-semibold">
              {format(new Date(request.eventDate), "PPP")}
            </span>
            ? The current status is{" "}
            <span className="font-semibold">{currentStatusText}</span>.
            <br />
            <span className="font-semibold text-destructive mt-2 block">
              This action cannot be undone.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:justify-start">
          {/* Destructive button for confirmation */}
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Confirm Cancellation"
            )}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isLoading}>
              Keep Service
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelServiceModal;
