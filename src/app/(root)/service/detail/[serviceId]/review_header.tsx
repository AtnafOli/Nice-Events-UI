"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Star,
  Info,
  MessageSquare,
  Plus,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import AddReviewModal from "../../../../../components/review/addreviewmodal"; // Adjust path as needed
import { reviewService as reviewServiceService } from "@/services/review.service"; // Adjust path as needed
import { CreateReview, Review } from "@/types/review"; // Adjust path as needed
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you have a cn helper for conditional classnames
import { useRouter } from "next/navigation";

interface ReviewSectionProps {
  serviceId: number;
  reviewService: Review[];
}

// Corrected Custom Progress component
const CustomProgress: React.FC<{
  value: number;
  className?: string;
  indicatorClassName?: string;
  [key: string]: any;
}> = ({
  value,
  className, // Classes for the container div of the progress bar
  indicatorClassName, // Classes specifically for the inner indicator div
  ...props // Other props like aria-label, etc.
}) => {
  return (
    <Progress
      value={value}
      // Use `cn` to combine classes and correctly apply indicatorClassName
      // by targeting the internal `div` using the `[&>div]:` selector.
      className={cn(
        "h-2 rounded-full", // Default styles for the progress container
        className, // Any additional classes passed to CustomProgress
        indicatorClassName && `[&>div]:${indicatorClassName}` // Apply indicator classes to the direct child div
      )}
      // Pass any other valid props down
      {...props}
    />
  );
};

export default function ReviewHeaderSection({
  serviceId,
  reviewService, // Array of Review objects from the API
}: ReviewSectionProps) {
  const router = useRouter();

  const stars = Array(5).fill(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(
    new Set()
  );

  const handleSubmitReview = async (
    formData: CreateReview
  ): Promise<boolean> => {
    try {
      await reviewServiceService.createReview(formData);
      router.refresh();
      return true;
    } catch (error) {
      console.error("Submission failed:", error);
      return false;
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const stats = useMemo(() => {
    const totalReviews = reviewService?.length || 0;
    let totalRating = 0;
    const ratingDistribution: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    if (totalReviews > 0) {
      reviewService.forEach((review) => {
        totalRating += review.rating;
        if (review.rating >= 1 && review.rating <= 5) {
          ratingDistribution[review.rating]++;
        }
      });
    }

    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

    const distributionPercentages: { [key: number]: number } = {};
    for (let i = 1; i <= 5; i++) {
      distributionPercentages[i] =
        totalReviews > 0
          ? Math.round((ratingDistribution[i] / totalReviews) * 100)
          : 0;
    }

    const summary =
      totalReviews > 0
        ? "Based on customer feedback, users generally praise the service's professionalism and quality outcomes. Many highlight excellent communication and a smooth booking process, contributing to a positive experience. Some feedback suggests minor improvements in scheduling flexibility."
        : null;

    return {
      totalReviews,
      rating: averageRating,
      ratingDistribution: distributionPercentages,
      summary,
    };
  }, [reviewService]);

  const toggleExpandReview = (reviewId: number) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const renderStars = (rating: number, size: string = "w-4 h-4") => (
    <span className="flex items-center text-yellow-400">
      {Array(rating)
        .fill(0)
        .map((_, i) => (
          <Star key={i} className={cn(size, "fill-current stroke-none")} />
        ))}
      {Array(5 - rating)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            className={cn(size, "text-muted stroke-muted-foreground")}
          />
        ))}
    </span>
  );

  return (
    <div className="container mx-auto  py-12 space-y-10  text-foreground">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-border">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Customer Reviews
        </h2>
        <Button
          onClick={openModal}
          className="flex items-center gap-2 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="w-5 h-5" />
          Add a Review
        </Button>
      </div>

      {/* Add Review Modal */}
      <AddReviewModal
        onSubmitReview={handleSubmitReview}
        serviceId={serviceId}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Info Card */}
      <div className="bg-card border border-border rounded-lg p-5 flex items-start gap-4 text-muted-foreground shadow-sm">
        <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm leading-relaxed">
          Your feedback helps us maintain high standards. Our verified reviews
          ensure transparency and build trust within the marketplace.
        </p>
      </div>

      {stats.totalReviews === 0 ? (
        /* No Reviews State */
        <div className="text-center py-16 text-muted-foreground bg-card rounded-lg border border-border shadow-sm">
          <MessageSquare className="mx-auto h-14 w-14 mb-6 text-muted" />
          <h3 className="mt-2 text-xl font-semibold text-foreground">
            No reviews yet
          </h3>
          <p className="mt-2 text-base text-muted-foreground max-w-md mx-auto">
            Be the first to share your experience. Your review will help others
            make informed decisions.
          </p>
          <Button
            onClick={openModal}
            className="mt-8 px-8 py-4 text-base shadow-md hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5 mr-2" /> Write the First Review
          </Button>
        </div>
      ) : (
        <>
          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-8 items-center pb-10 border-b border-border">
            <div className="flex flex-col items-center p-8 bg-card rounded-lg border border-border shadow-sm">
              <div className="text-7xl font-bold text-foreground mb-4">
                {stats.rating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 mb-4">
                {renderStars(Math.floor(stats.rating), "w-7 h-7")}
              </div>
              <div className="text-sm text-muted-foreground mb-2">Based on</div>
              <div className="text-lg font-semibold text-foreground">
                {stats.totalReviews.toLocaleString()} verified reviews
              </div>
            </div>

            <div className="space-y-4 p-8 col-span-2 bg-card rounded-lg border border-border shadow-sm">
              {[5, 4, 3, 2, 1].map((rating) => {
                const value = stats.ratingDistribution[rating];
                return (
                  <div key={rating} className="flex items-center gap-5">
                    <div className="w-20 text-sm font-medium text-muted-foreground">
                      {rating} Stars
                    </div>
                    <div className="flex-1">
                      <CustomProgress
                        value={value}
                        className="bg-border" // Container background
                        indicatorClassName="bg-primary" // Indicator color via CustomProgress helper
                        aria-label={`${rating} star reviews`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="w-12 text-sm font-medium text-muted-foreground text-right">
                      {value}%
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Review Summary Card
          {stats.summary && (
            <Card className="bg-card border border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-foreground">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Review Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-md border border-border">
                  This AI-generated summary provides key insights from customer
                  feedback and ratings.
                </div>
                <p className="text-foreground leading-relaxed">
                  {stats.summary}
                </p>
              </CardContent>
            </Card>
          )} */}
          {/* Individual Reviews Section */}
          <div className="space-y-6 pt-8">
            <h3 className="text-xl font-semibold text-foreground">
              Customer Reviews
            </h3>
            {reviewService.map((review) => {
              const isExpanded = expandedReviews.has(review.id);
              const hasImages = review.images && review.images.length > 0;
              const previewImages = hasImages ? review.images.slice(0, 3) : [];
              const remainingImagesCount = hasImages
                ? review.images.length - previewImages.length
                : 0;

              return (
                <Card
                  key={review.id}
                  className="bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
                >
                  <CardHeader className="pb-4 flex flex-row items-start justify-between">
                    <div className="flex flex-col">
                      <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
                        {review.fullName}
                        {renderStars(review.rating, "w-4 h-4")}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpandReview(review.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors -mr-2" // Negative margin to offset padding
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                      <span className="sr-only">
                        {isExpanded ? "View Less" : "View More"}
                      </span>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p
                      className={cn(
                        "text-muted-foreground leading-relaxed",
                        !isExpanded && "line-clamp-3"
                      )}
                    >
                      {review.comment}
                    </p>

                    {/* Image Preview Grid */}
                    {!isExpanded && previewImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        {previewImages.map((image, index) => (
                          <div
                            key={index}
                            className="relative w-full aspect-square overflow-hidden rounded-md bg-muted border border-border"
                          >
                            <Image
                              src={image.imageUrl}
                              alt={`Review image ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 150px"
                              style={{ objectFit: "cover" }}
                              className="transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        ))}
                        {/* "View all photos" link */}
                        {remainingImagesCount > 0 && (
                          <div
                            className="relative w-full aspect-square rounded-md bg-muted flex flex-col items-center justify-center text-muted-foreground text-center text-sm cursor-pointer hover:bg-muted/70 transition-colors p-2"
                            onClick={() => toggleExpandReview(review.id)}
                          >
                            <ImageIcon className="w-6 h-6 mb-1" /> {/* Icon */}+
                            {remainingImagesCount} more
                            <span className="sr-only">
                              View all {review.images?.length} photos
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expanded Content (Full Comment and Images) */}
                    {isExpanded && (
                      <div className="space-y-4 pt-2">
                        {hasImages && (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {review.images?.map((image, index) => (
                              <div
                                key={index}
                                className="relative w-full h-32 overflow-hidden rounded-md bg-muted border border-border"
                              >
                                <Image
                                  src={image.imageUrl}
                                  alt={`Review image ${index + 1}`}
                                  fill
                                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                  style={{ objectFit: "cover" }}
                                  className="transition-transform duration-300 hover:scale-105"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {isExpanded && !hasImages && (
                          <div className="text-center text-muted-foreground text-sm italic">
                            No images attached to this review.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                  {/* View More/Less Button moved to Header */}
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
