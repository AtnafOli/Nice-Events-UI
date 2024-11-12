const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Title Skeleton */}
      <div className="h-8 w-2/3 mx-auto bg-gray-300 animate-pulse rounded-lg"></div>

      {/* Description Skeleton */}
      <div className="h-6 w-4/5 mx-auto bg-gray-300 animate-pulse rounded-lg"></div>

      {/* Card Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="relative rounded-2xl border-2 p-6 cursor-pointer transition-all duration-300 transform border-gray-200 hover:border-gray-300 hover:scale-105 hover:shadow-md"
            >
              <div className="absolute -top-5 -right-5 bg-gray-400 animate-pulse h-6 w-24 rounded-full"></div>

              <div className="text-center space-y-4">
                {/* Billing cycle skeleton */}
                <div className="h-6 w-1/2 mx-auto bg-gray-300 animate-pulse rounded-lg"></div>

                {/* Price skeleton */}
                <div className="space-y-2">
                  <div className="h-8 w-3/4 mx-auto bg-gray-300 animate-pulse rounded-lg"></div>
                  <div className="h-8 w-1/2 mx-auto bg-gray-300 animate-pulse rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Features Skeleton */}
      <div className="rounded-3xl p-8 bg-gray-50 dark:bg-gray-800/50 mt-8">
        <h3 className="font-bold text-lg lg:text-xl mb-8 text-primary bg-gray-300 animate-pulse h-6 w-24"></h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="p-2 rounded-lg bg-gray-300 animate-pulse h-6 w-6"></div>
                <div className="w-2/3">
                  <div className="h-6 bg-gray-300 animate-pulse rounded-lg"></div>
                  <div className="h-4 bg-gray-300 animate-pulse rounded-lg mt-2"></div>
                  <div className="h-4 bg-gray-300 animate-pulse rounded-lg mt-2 w-4/5"></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Order Summary Skeleton */}
      <div className="rounded-3xl p-8 bg-secondary/5 mt-8">
        <h3 className="font-bold text-2xl sm:text-3xl mb-6 text-primary bg-gray-300 animate-pulse h-6 w-24"></h3>
        <div className="space-y-4">
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span className="h-6 w-1/3 bg-gray-300 animate-pulse rounded-lg"></span>
            <span className="h-6 w-1/4 bg-gray-300 animate-pulse rounded-lg"></span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span className="h-6 w-1/3 bg-gray-300 animate-pulse rounded-lg"></span>
            <span className="h-6 w-1/4 bg-gray-300 animate-pulse rounded-lg"></span>
          </div>
          <div className="flex justify-between text-gray-800 dark:text-gray-200 font-semibold text-lg">
            <span className="h-6 w-1/3 bg-gray-300 animate-pulse rounded-lg"></span>
            <span className="h-6 w-1/4 bg-gray-300 animate-pulse rounded-lg"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
