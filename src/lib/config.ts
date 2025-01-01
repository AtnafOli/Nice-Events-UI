export const config = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8005/api",
  apiTimeout: 90000,
};
