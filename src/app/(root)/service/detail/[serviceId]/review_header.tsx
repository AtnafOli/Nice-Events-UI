import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Info, MessageSquare } from "lucide-react";
import React from "react";

interface ReviewStats {
  rating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number;
  };
  summary: string;
}

interface ReviewSectionProps {
  stats: ReviewStats;
}

interface ProgressProps extends React.ComponentProps<typeof Progress> {
  indicatorClassName?: string;
}

const CustomProgress: React.FC<ProgressProps> = ({
  indicatorClassName,
  ...props
}) => {
  return (
    <Progress
      {...props}
      style={{
        ["--progress-indicator-class" as string]: indicatorClassName,
      }}
    />
  );
};

export default function ReviewHeaderSection({ stats }: ReviewSectionProps) {
  const stars = Array(5).fill(0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
        Reviews
      </h2>
      <Card className="bg-secondary/30 shadow-none p-0">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-secondary-foreground bg-primaryp-4 rounded-lg">
            <Info className="h-5 w-5 text-primary" />
            <p className="text-sm">
              Your trust matters to us. Our review system ensures authentic
              feedback to help you make informed decisions.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4 items-start">
        <div className="flex flex-col items-center p-8 bg-white/10 rounded-xl shadow-sm">
          <div className="text-6xl font-bold text-gray-900 mb-4">
            {stats.rating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mb-3">
            {stars.map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(stats.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-200"
                } transition-colors`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mb-1">Based on</div>
          <div className="text-lg font-semibold text-gray-900 mb-6">
            {stats.totalReviews.toLocaleString()} verified reviews
          </div>
          <Button className="bg-primary hover:bg-primary text-white px-8 py-2 rounded-full transition-all transform hover:scale-105">
            Write a Review
          </Button>
        </div>

        <div className="space-y-4 bg-white/10 p-8 col-span-2 rounded-xl shadow-sm">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-4">
              <div className="w-20 text-sm font-medium text-gray-700">
                {rating} Stars
              </div>
              <div className="flex-1">
                <CustomProgress
                  value={stats.ratingDistribution[rating]}
                  className="h-2.5 rounded-full bg-gray-300"
                  indicatorClassName="bg-primary rounded-full"
                  aria-label={`${rating} star reviews`}
                />
              </div>
              <div className="w-16 text-sm font-medium text-gray-700">
                {stats.ratingDistribution[rating]}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
            <MessageSquare className="h-6 w-6 text-orange-600" />
            Review Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 bg-white bg-opacity-50 p-4 rounded-lg">
            This AI-generated summary provides key insights from customer
            feedback and ratings.
          </div>
          <p className="text-gray-800 leading-relaxed">{stats.summary}</p>
        </CardContent>
      </Card>
    </div>
  );
}
