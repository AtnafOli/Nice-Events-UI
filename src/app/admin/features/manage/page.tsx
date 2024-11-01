import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureTable } from "@/components/tables/features-table";
import { CreateFeatureDialog } from "@/components/dialoags/create-feature-dialog";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 mb-8">
          <div className="space-y-2 animate-slideInLeft">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 dark:from-primary-400 dark:to-primary-600">
              Features Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage and organize your product features efficiently
            </p>
          </div>

          <div className="animate-slideInRight">
            <CreateFeatureDialog>
              <Button className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 text-sm sm:text-base font-medium">
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-300" />
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-90" />
                <span>Add Feature</span>
              </Button>
            </CreateFeatureDialog>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl backdrop-blur-lg border border-gray-100 dark:border-gray-700 animate-slideInUp">
          <div className="p-1 sm:p-2">
            <FeatureTable />
          </div>
        </div>
      </div>
    </div>
  );
}
