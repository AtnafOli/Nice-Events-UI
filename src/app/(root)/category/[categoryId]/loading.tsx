export default function LoadingServices() {
  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-16">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-400 rounded w-1/4 mb-4"></div>
        <div className="h-12 bg-gray-400 rounded w-1/2 mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-400 h-64 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
