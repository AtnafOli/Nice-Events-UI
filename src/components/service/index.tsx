"use client";

import React, { useState, useMemo } from "react";
import { useServiceRequests } from "@/hooks/service-request.hooks";
import { ServiceRequest, ServiceRequestStatus } from "@/types/service-request";
import { format } from "date-fns";
import { useUser } from "@/context/userContext";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Terminal,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  PlayCircle,
  XCircle,
  CheckCircle,
  AlertCircle,
  Filter,
  MoreVertical, // Using a different icon for trigger potentially
  Info, // Example for placeholder
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

import StartServiceModal from "./StartServiceModal";
import CompleteServiceModal from "./CompleteServiceModal";
import CancelServiceModal from "./CancelServiceModal";
import DeclineServiceModal from "./DeclineServiceModal";
import FailServiceModal from "./FailServiceModal";

const getStatusVariant = (
  status: ServiceRequestStatus
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case ServiceRequestStatus.PENDING:
      return "secondary";
    case ServiceRequestStatus.ACCEPTED: // Assuming Accepted is similar to Pending visually or needs its own style
      return "outline"; // Example: using outline for accepted
    case ServiceRequestStatus.IN_PROGRESS:
      return "default";
    case ServiceRequestStatus.COMPLETED:
      return "outline"; // Keep outline for completed
    case ServiceRequestStatus.FAILED:
      return "destructive";
    case ServiceRequestStatus.CANCELLED:
      return "destructive";
    case ServiceRequestStatus.DECLINED:
      return "destructive";
    default:
      return "outline";
  }
};

const ITEMS_PER_PAGE = 10;

function ServiceRequestsPage() {
  const { user } = useUser();
  const {
    serviceRequests,
    isLoading: isQueryLoading,
    error: queryError,
    updateServiceRequestStatus,
  } = useServiceRequests();

  // Ensure updateServiceRequestStatus is defined before destructuring
  const updateStatusFn = updateServiceRequestStatus?.mutate || (() => {});
  const isMutationPending = updateServiceRequestStatus?.isPending || false;
  const mutationError = updateServiceRequestStatus?.error || null;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Filtering state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    ServiceRequestStatus | "ALL"
  >("ALL");

  // Modal states
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null
  );

  const isVendor = user?.role === "vendor";
  const isAdmin = user?.role === "admin";

  // Filter and paginate service requests
  const filteredRequests = useMemo(() => {
    if (!serviceRequests) return [];

    return serviceRequests.filter((request: ServiceRequest) => {
      const matchesSearch =
        searchTerm === "" ||
        `${request.firstName} ${request.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (request.service?.name || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (request.phoneNumber || "").includes(searchTerm);

      const matchesStatus =
        statusFilter === "ALL" || request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [serviceRequests, searchTerm, statusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRequests, currentPage]);

  // Modal handler functions
  const openModal = (request: ServiceRequest, modalType: string) => {
    setSelectedRequest(request);
    switch (modalType) {
      case "start": // Used for both Vendor "Start" and Admin "Accept"
        setIsStartModalOpen(true);
        break;
      case "complete":
        setIsCompleteModalOpen(true);
        break;
      case "cancel":
        setIsCancelModalOpen(true);
        break;
      case "decline":
        setIsDeclineModalOpen(true);
        break;
      case "fail":
        setIsFailModalOpen(true);
        break;
    }
  };

  const handleCloseModal = () => {
    setIsStartModalOpen(false);
    setIsCompleteModalOpen(false);
    setIsCancelModalOpen(false);
    setIsDeclineModalOpen(false);
    setIsFailModalOpen(false);
    setSelectedRequest(null);
  };

  // Status update handlers
  const handleStatusUpdate = (newStatus: ServiceRequestStatus) => {
    if (!selectedRequest || !updateStatusFn) return;
    updateStatusFn(
      { id: selectedRequest.id, status: newStatus },
      {
        onSuccess: () => {
          handleCloseModal();
          // Optionally: refetch data or update local cache here if needed
        },
        onError: (error: any) => {
          console.error(`Failed to update service to ${newStatus}:`, error);
          // Keep modal open or show error message? For now, just closing.
          handleCloseModal();
        },
      }
    );
  };

  // Renamed handler for clarity, maps to 'start' modal but updates status correctly
  const handleAcceptOrStartConfirm = () => {
    // Logic depends on what status "Accept" should lead to. Assuming ACCEPTED for admin, IN_PROGRESS for vendor?
    // Or does "Accept" for admin just mean it's assigned/acknowledged, not started?
    // Let's assume both Admin "Accept" and Vendor "Start" move to IN_PROGRESS for simplicity, matching the original modal.
    // If Admin Accept should go to ACCEPTED state, change here.
    handleStatusUpdate(ServiceRequestStatus.IN_PROGRESS);
    // If Admin "Accept" should result in ServiceRequestStatus.ACCEPTED:
    // handleStatusUpdate(isAdmin ? ServiceRequestStatus.ACCEPTED : ServiceRequestStatus.IN_PROGRESS);
  };
  const handleCompleteConfirm = () =>
    handleStatusUpdate(ServiceRequestStatus.COMPLETED);
  const handleCancelConfirm = () =>
    handleStatusUpdate(ServiceRequestStatus.CANCELLED);
  const handleDeclineConfirm = () =>
    handleStatusUpdate(ServiceRequestStatus.DECLINED);
  const handleFailConfirm = () =>
    handleStatusUpdate(ServiceRequestStatus.FAILED);
  // Removed handleAcceptConfirm as it's covered by handleAcceptOrStartConfirm

  if (isQueryLoading) {
    // --- Loading Skeleton remains the same ---
    return (
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Service Requests</h1>
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Requester</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={`skel-${i}`}>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-40" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-32" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  if (queryError) {
    // --- Error Alert remains the same ---
    return (
      <div className="container mx-auto p-4 md:p-8">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Fetching Data</AlertTitle>
          <AlertDescription>
            Could not load service requests. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* --- Header and Filters remain the same --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Service Requests</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Input
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 w-full sm:w-auto min-w-[220px]"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value: any) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value={ServiceRequestStatus.PENDING}>
                Pending
              </SelectItem>
              <SelectItem value={ServiceRequestStatus.ACCEPTED}>
                Accepted
              </SelectItem>
              <SelectItem value={ServiceRequestStatus.IN_PROGRESS}>
                In Progress
              </SelectItem>
              <SelectItem value={ServiceRequestStatus.COMPLETED}>
                Completed
              </SelectItem>
              <SelectItem value={ServiceRequestStatus.FAILED}>
                Failed
              </SelectItem>
              <SelectItem value={ServiceRequestStatus.CANCELLED}>
                Cancelled {/* Corrected label */}
              </SelectItem>
              <SelectItem value={ServiceRequestStatus.DECLINED}>
                Declined
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {mutationError && (
        <Alert variant="destructive" className="mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Update Failed</AlertTitle>
          <AlertDescription>
            {(mutationError as any)?.response?.data?.message ||
              "Could not update status. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      <Card className="overflow-hidden shadow-md border-border/40">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              {(!paginatedRequests || paginatedRequests.length === 0) && (
                <TableCaption>No service requests found.</TableCaption>
              )}
              <TableHeader>
                {/* --- Table Header remains the same --- */}
                <TableRow className="bg-muted/40">
                  <TableHead className="w-[150px]">Requester</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right min-w-[180px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!paginatedRequests || paginatedRequests.length === 0 ? (
                  // --- Empty state remains the same ---
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <AlertCircle className="h-8 w-8 mb-2" />
                        <p>No service requests found matching your criteria.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedRequests.map((request: ServiceRequest) => {
                    const isTerminalStatus = [
                      ServiceRequestStatus.COMPLETED,
                      ServiceRequestStatus.CANCELLED,
                      ServiceRequestStatus.FAILED,
                      ServiceRequestStatus.DECLINED,
                    ].includes(request.status);

                    // Determine if *any* actions are available for the current user and status
                    const canPerformAction =
                      (isAdmin &&
                        request.status === ServiceRequestStatus.PENDING) ||
                      (isVendor &&
                        (request.status === ServiceRequestStatus.PENDING ||
                          request.status === ServiceRequestStatus.ACCEPTED || // Assuming vendor can start an accepted one too
                          request.status === ServiceRequestStatus.IN_PROGRESS));

                    return (
                      <TableRow key={request.id} className="hover:bg-muted/30">
                        {/* --- Table Cells for data remain the same --- */}
                        <TableCell className="font-medium">{`${request.firstName} ${request.lastName}`}</TableCell>
                        <TableCell>{request.service?.name || "N/A"}</TableCell>
                        <TableCell>
                          {request.eventDate
                            ? format(new Date(request.eventDate), "PPP")
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusVariant(request.status)}
                            className={`
                                ${
                                  request.status ===
                                  ServiceRequestStatus.COMPLETED
                                    ? "border-green-500 text-green-600"
                                    : ""
                                }
                                ${
                                  request.status ===
                                  ServiceRequestStatus.PENDING
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                    : ""
                                }
                                ${
                                  request.status ===
                                  ServiceRequestStatus.IN_PROGRESS
                                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                    : ""
                                }
                                capitalize // Nicer display
                              `}
                          >
                            {request.status.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.phoneNumber || "N/A"}</TableCell>

                        {/* --- ACTION CELL --- */}
                        <TableCell className="text-right">
                          {isMutationPending &&
                          selectedRequest?.id === request.id ? (
                            <Button size="sm" variant="outline" disabled>
                              <Loader2 className="h-4 w-4 mr-1 animate-spin" />{" "}
                              Processing
                            </Button>
                          ) : // Only show dropdown if not terminal status and user has potential actions
                          !isTerminalStatus && canPerformAction ? (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline">
                                  Actions{" "}
                                  {/* Consider <MoreVertical className="h-4 w-4 ml-1" /> */}
                                  <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                  Manage Request
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                  {/* --- PENDING State Actions --- */}
                                  {request.status ===
                                    ServiceRequestStatus.PENDING && (
                                    <>
                                      {/* Action available to both Vendor and Admin */}
                                      {isVendor && (
                                        <DropdownMenuItem
                                          onClick={() =>
                                            openModal(request, "start")
                                          }
                                          className="text-blue-600"
                                        >
                                          <PlayCircle className="h-4 w-4 mr-2" />
                                          {isAdmin
                                            ? "Accept"
                                            : "Start Progress"}
                                        </DropdownMenuItem>
                                      )}
                                      {/* Vendor Only Action */}
                                      {isVendor && (
                                        <DropdownMenuItem
                                          onClick={() =>
                                            openModal(request, "decline")
                                          }
                                          className="text-red-600"
                                        >
                                          <X className="h-4 w-4 mr-2" />
                                          Decline
                                        </DropdownMenuItem>
                                      )}
                                      {/* Admin Only Action */}
                                      {isAdmin && (
                                        <DropdownMenuItem
                                          onClick={() =>
                                            openModal(request, "cancel")
                                          }
                                          className="text-red-600"
                                        >
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Cancel Request
                                        </DropdownMenuItem>
                                      )}
                                    </>
                                  )}

                                  {/* --- ACCEPTED State Actions (Example: If Vendor can start from Accepted) --- */}
                                  {request.status ===
                                    ServiceRequestStatus.ACCEPTED &&
                                    isVendor && (
                                      <DropdownMenuItem
                                        onClick={() =>
                                          openModal(request, "start")
                                        } // Still uses "start" modal/handler
                                        className="text-blue-600"
                                      >
                                        <PlayCircle className="h-4 w-4 mr-2" />
                                        Start Progress
                                      </DropdownMenuItem>
                                    )}

                                  {/* --- IN_PROGRESS State Actions (Vendor Only) --- */}
                                  {request.status ===
                                    ServiceRequestStatus.IN_PROGRESS &&
                                    isVendor && (
                                      <>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            openModal(request, "complete")
                                          }
                                          className="text-green-600"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Mark as Completed
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() =>
                                            openModal(request, "fail")
                                          }
                                          className="text-orange-600"
                                        >
                                          <AlertCircle className="h-4 w-4 mr-2" />
                                          Mark as Failed
                                        </DropdownMenuItem>
                                      </>
                                    )}
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          ) : (
                            // Show "No Actions" for terminal states or if user has no actions for current state
                            <span className="text-xs text-muted-foreground italic pr-4">
                              {isTerminalStatus ? "Final Status" : "No actions"}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- Pagination Controls remain the same --- */}
      {filteredRequests.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            {Math.min(
              filteredRequests.length,
              (currentPage - 1) * ITEMS_PER_PAGE + 1
            )}{" "}
            to {Math.min(filteredRequests.length, currentPage * ITEMS_PER_PAGE)}{" "}
            of {filteredRequests.length} requests
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <div className="flex items-center space-x-1">
              {[...Array(totalPages)].map((_, i) =>
                /* Simple pagination numbers - consider ellipsis for many pages */
                totalPages <= 7 || // Show all if few pages
                i + 1 === 1 ||
                i + 1 === totalPages || // Always show first and last
                Math.abs(currentPage - (i + 1)) <= 1 ? ( // Show current and neighbors
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    className={`w-8 h-8 p-0 ${
                      currentPage === i + 1
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ) : // Add ellipsis logic if needed
                (i + 1 === 2 && currentPage > 3) ||
                  (i + 1 === totalPages - 1 && currentPage < totalPages - 2) ? (
                  <span key={`ellipsis-${i}`} className="px-2">
                    ...
                  </span>
                ) : null
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* --- Modals remain the same --- */}
      <StartServiceModal
        isOpen={isStartModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
        // Pass isAdmin to potentially change text inside the modal if needed
        // isAdmin={isAdmin}
        onConfirm={handleAcceptOrStartConfirm} // Use the combined handler
        isLoading={isMutationPending && selectedRequest?.id !== null}
      />

      <CompleteServiceModal
        isOpen={isCompleteModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
        onConfirm={handleCompleteConfirm}
        isLoading={isMutationPending && selectedRequest?.id !== null}
      />

      <CancelServiceModal
        isOpen={isCancelModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
        onConfirm={handleCancelConfirm}
        isLoading={isMutationPending && selectedRequest?.id !== null}
      />

      <DeclineServiceModal
        isOpen={isDeclineModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
        onConfirm={handleDeclineConfirm}
        isLoading={isMutationPending && selectedRequest?.id !== null}
      />

      <FailServiceModal
        isOpen={isFailModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
        onConfirm={handleFailConfirm}
        isLoading={isMutationPending && selectedRequest?.id !== null}
      />
    </div>
  );
}

export default ServiceRequestsPage;
