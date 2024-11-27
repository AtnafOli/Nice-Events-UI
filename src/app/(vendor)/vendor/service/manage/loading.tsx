import ServiceCardSkeleton from "@/components/skeleton/service_skelton";

export default function ServicesPage() {
  return (
    <div className="min-h-screen  animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-4 lg:px-4 py-4 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 mb-8">
          <div className="space-y-2 animate-slideInLeft">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
              Your Services
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage you services efficiently
            </p>
          </div>
        </div>

        <div className=" rounded-2xl animate-slideInUp">
          <div className="p-1 sm:p-2">
            <div className="grid grid-cols-3 gap-6">
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
