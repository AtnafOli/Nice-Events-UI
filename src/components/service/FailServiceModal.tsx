import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle, Loader2 } from "lucide-react";
import { ServiceRequest } from "@/types/service-request";

function FailServiceModal({
  isOpen,
  onClose,
  request,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  request: ServiceRequest | null;
  onConfirm: () => void;
  isLoading: boolean;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark Service as Failed</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to mark this service request from{" "}
            <span className="font-semibold">
              {request?.firstName} {request?.lastName}
            </span>{" "}
            as failed? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-orange-600 hover:bg-orange-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <AlertCircle className="mr-2 h-4 w-4" />
                Mark as Failed
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default FailServiceModal;
