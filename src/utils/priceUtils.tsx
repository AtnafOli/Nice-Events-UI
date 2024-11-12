import { BillingCycle, Price } from "@/types/plan/plan";

// Format price according to the locale and currency
export const formatPrice = (amount?: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

// Get the human-readable billing cycle label
export const getBillingCycleLabel = (cycle: BillingCycle) => {
  const labels = {
    MONTH_3: "Quarterly",
    MONTH_6: "Semi-Annual",
    MONTH_12: "Annual",
  };
  return labels[cycle] || "Monthly";
};

// Calculate monthly price from a given cycle and price amount
export const calculateMonthlyPrice = (price: Price) => {
  const cycleMonths: { [key in BillingCycle]?: number } = {
    MONTH_3: 3,
    MONTH_6: 6,
    MONTH_12: 12,
  };
  const months = cycleMonths[price.billingCycle] || 1;
  return price.amount / months;
};

// Calculate discount percentage if a discount price is present
export const calculateDiscountPercentage = (price: Price) => {
  if (!price.discountedPrice || price.discountedPrice === 0) return 0;
  return ((price.amount - price.discountedPrice) / price.amount) * 100;
};

// Convert date to a readable format
export const formatDate = (
  date: string | Date,
  format: string = "yyyy-MM-dd"
) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
};

// Helper function to get the next billing cycle label
export const getNextBillingCycle = (cycle: BillingCycle) => {
  const nextCycle: { [key in BillingCycle]?: BillingCycle } = {
    MONTH_3: BillingCycle.MONTH_3,
    MONTH_6: BillingCycle.MONTH_6,
    MONTH_12: BillingCycle.MONTH_12,
  };
  return nextCycle[cycle] || "MONTH_3"; // Default to MONTH_3 if unknown
};
