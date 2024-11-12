import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatPrice } from "@/utils/priceUtils";
import { Price } from "@/types/plan/plan";

const PriceFeature = ({
  selectedPrice,
  onContinue,
}: {
  selectedPrice: Price | undefined;
  onContinue: () => void;
}) => {
  if (!selectedPrice) return null;

  return (
    <div className="rounded-3xl p-8 bg-gray-50 dark:bg-gray-800/50 mt-8">
      <h3 className="font-bold text-lg lg:text-xl mb-8 text-primary">
        Order Summary
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Initial Price</span>
          <span>
            {formatPrice(
              (selectedPrice?.amount || 0) +
                (selectedPrice?.discountedPrice || 0)
            )}
          </span>
        </div>
        {selectedPrice?.discountedPrice && (
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Discount</span>
            <span>{formatPrice(selectedPrice.discountedPrice)}</span>
          </div>
        )}
        <div className="flex justify-between text-gray-800 dark:text-gray-200 font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(selectedPrice?.amount)}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button
          className="w-full sm:w-auto text-lg py-3 px-6 bg-primary hover:bg-primary/80 text-white font-semibold rounded-md shadow-md transition"
          onClick={onContinue}
        >
          <ArrowRight className="w-5 h-5 mr-2" /> Continue to Checkout
        </Button>
      </div>
    </div>
  );
};

export default PriceFeature;
