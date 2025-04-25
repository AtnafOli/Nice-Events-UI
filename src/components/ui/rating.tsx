import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: number;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  size = 24,
}) => {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="flex items-center">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={cn(
            "p-1",
            "focus:outline-none",
            star <= value ? "text-yellow-400" : "text-gray-300"
          )}
          aria-label={`${star} Star`}
        >
          <Star size={size} />
        </button>
      ))}
    </div>
  );
};
