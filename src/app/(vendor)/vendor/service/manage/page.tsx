"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateServiceDialog from "@/features/services/create-service-dialog";
import VendorServicesList from "@/components/services/vendor/service_list";

export default function ServicesPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen animate-fadeIn">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div className="space-y-2 animate-slideInLeft">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
              Your Services
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage your services efficiently
            </p>
          </div>
          <div className="animate-slideInRight">
            <Button
              onClick={() => setIsOpen(true)}
              className="group relative overflow-hidden shadow-lg transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-lg w-full sm:w-auto flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-300" />
              <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              <span>Create New Service</span>
            </Button>
            <CreateServiceDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            ></CreateServiceDialog>
          </div>
        </div>
        <div className="rounded-2xl animate-slideInUp p-2">
          <VendorServicesList />
        </div>
      </div>
    </div>
  );
}
