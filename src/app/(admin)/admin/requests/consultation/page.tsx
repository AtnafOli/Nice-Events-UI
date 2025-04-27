"use client";

import React, { useEffect, useState, useCallback } from "react";
import { helpService } from "@/services/help.service";
import { Help } from "@/types/help";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { List, Grid, Filter } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function HelpRequestsPage() {
  const [helps, setHelps] = useState<Help[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filters, setFilters] = useState({ status: "all", eventType: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchHelps = useCallback(async () => {
    try {
      const res = await helpService.getHelp();
      setHelps(res.data);
    } catch (error) {
      console.error("Failed to fetch help requests", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHelps();
  }, [fetchHelps]);

  const filteredHelps = helps.filter((help) => {
    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "seen" ? help.seen : !help.seen);
    const matchesEventType =
      filters.eventType === "all" || help.eventType === filters.eventType;
    return matchesStatus && matchesEventType;
  });

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHelps.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHelps.length / itemsPerPage);

  const handleMarkSeen = async (id: number) => {
    try {
      await helpService.seenHelp(id);
      setHelps(
        helps.map((help) => (help.id === id ? { ...help, seen: true } : help))
      );
    } catch (error) {
      console.error("Failed to mark as seen", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Help Requests</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, status: "all" }))}
              >
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, status: "seen" }))}
              >
                Seen Only
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters((p) => ({ ...p, status: "new" }))}
              >
                New Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value: "list" | "grid") => setViewMode(value)}
          >
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {loading ? (
        <div
          className={`grid gap-4 ${
            viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : ""
          }`}
        >
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className={`h-32 rounded-xl ${
                viewMode === "grid" ? "w-full" : "w-full"
              }`}
            />
          ))}
        </div>
      ) : filteredHelps.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 gap-4">
          <div className="text-6xl">🕳️</div>
          <p className="text-gray-500 text-lg">No help requests found</p>
          <Button
            onClick={() => setFilters({ status: "all", eventType: "all" })}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div
            className={`grid gap-4 ${
              viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : ""
            }`}
          >
            {currentItems.map((help) => (
              <div
                key={help.id}
                className={`group p-4 border rounded-xl shadow-sm hover:shadow-lg transition-all bg-white ${
                  viewMode === "grid"
                    ? "h-full flex flex-col justify-between"
                    : ""
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-2">
                      {help.fullName}
                    </h2>
                    <Badge
                      variant={help.seen ? "default" : "destructive"}
                      className="shrink-0"
                    >
                      {help.seen ? "Seen" : "New"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">{help.phoneNumber}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    <span className="font-medium">{help.eventType}</span> •
                    {format(parseISO(help.eventDate), "PPP")}
                  </p>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!help.seen && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMarkSeen(help.id)}
                    >
                      Mark as Seen
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="flex items-center px-4">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default HelpRequestsPage;
