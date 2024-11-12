export const ErrorState = ({ message }: { message: string }) => (
  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-600 dark:text-red-400">
    <p>Error loading plans: {message}</p>
  </div>
);
