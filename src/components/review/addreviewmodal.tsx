"use client";

import React, { useState, useRef, useEffect, forwardRef } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Star, X, Loader2, CalendarIcon, UploadCloud } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateReview } from "@/types/review";

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: number;
  onSubmitReview: (reviewData: CreateReview) => Promise<boolean>;
}

interface ImagePreview {
  file: File;
  url: string;
}

const CustomDateInput = forwardRef<
  HTMLButtonElement,
  {
    value?: string;
    onClick?: () => void;
    error?: boolean;
    onBlur?: () => void;
  }
>(({ value, onClick, error, onBlur }, ref) => (
  <Button
    variant="outline"
    ref={ref}
    className={`w-full justify-start text-left font-normal ${
      !value && "text-muted-foreground"
    } ${error ? "border-red-500" : ""}`}
    onClick={onClick}
    onBlur={onBlur}
    type="button"
  >
    <CalendarIcon className="mr-2 h-4 w-4" />
    {value || "Select event date"}
  </Button>
));

export default function AddReviewModal({
  isOpen,
  onClose,
  serviceId,
  onSubmitReview,
}: AddReviewModalProps) {
  const [fullName, setFullName] = useState("");
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = imagePreviews.map((p) => p.url);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [imagePreviews]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!eventDate) newErrors.eventDate = "Event date is required.";
    if (rating === 0) newErrors.rating = "Rating is required.";
    if (!comment.trim()) newErrors.comment = "Review comment is required.";
    if (imagePreviews.length === 0)
      newErrors.images = "At least one event photo is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setTouchedFields({
        fullName: true,
        eventDate: true,
        rating: true,
        comment: true,
        images: true,
      });
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("serviceId", String(serviceId));
    formData.append("fullName", fullName);
    eventDate && formData.append("eventDate", eventDate.toISOString());
    formData.append("rating", String(rating));
    formData.append("comment", comment);

    // append each image file; change "images"→"images[]" if your server expects that
    imagePreviews.forEach((img) =>
      formData.append("images", img.file, img.file.name)
    );

    // ── DEBUG: Print every FormData entry ──────────────────────────
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log("all images:", formData.getAll("images"));
    // ───────────────────────────────────────────────────────────────

    try {
      const success = await onSubmitReview(formData as unknown as CreateReview);
      if (success) {
        toast.success("Review submitted successfully!");
        resetForm();
        onClose();
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("An error occurred during submission.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setTouchedFields((prev) => ({ ...prev, images: true }));
  };

  const removeImage = (url: string) => {
    setImagePreviews((prev) => {
      const removed = prev.find((p) => p.url === url);
      removed && URL.revokeObjectURL(removed.url);
      return prev.filter((p) => p.url !== url);
    });
    setTouchedFields((prev) => ({ ...prev, images: true }));
  };

  const resetForm = () => {
    setFullName("");
    setEventDate(null);
    setRating(0);
    setHoverRating(0);
    setComment("");
    setImagePreviews([]);
    setErrors({});
    setTouchedFields({});
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      resetForm();
      onClose();
    }
  };

  const handleDateBlur = () => {
    setTouchedFields((prev) => ({ ...prev, eventDate: true }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg sm:max-w-xl md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Share Your Experience
          </DialogTitle>
          <DialogDescription>
            Your feedback helps others and the service provider.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 py-4 max-h-[70vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="fullName"
                  className={errors.fullName ? "text-red-600" : ""}
                >
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setTouchedFields((prev) => ({ ...prev, fullName: true }));
                  }}
                  className={errors.fullName ? "border-red-500" : ""}
                  disabled={isLoading}
                  onBlur={() =>
                    setTouchedFields((prev) => ({ ...prev, fullName: true }))
                  }
                />
                {touchedFields.fullName && errors.fullName && (
                  <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="eventDate"
                  className={errors.eventDate ? "text-red-600" : ""}
                >
                  Event Date <span className="text-red-500">*</span>
                </Label>
                <DatePicker
                  selected={eventDate}
                  onChange={(date: Date) => {
                    setEventDate(date);
                    setTouchedFields((prev) => ({
                      ...prev,
                      eventDate: true,
                    }));
                  }}
                  maxDate={new Date()}
                  disabled={isLoading}
                  customInput={
                    <CustomDateInput
                      error={!!errors.eventDate && touchedFields.eventDate}
                      onBlur={handleDateBlur}
                    />
                  }
                  popperClassName="z-[100]"
                  className="w-full"
                  dateFormat="MMMM d, yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                {touchedFields.eventDate && errors.eventDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.eventDate}
                  </p>
                )}
              </div>

              <div>
                <Label className={errors.rating ? "text-red-600" : ""}>
                  Rating <span className="text-red-500">*</span>
                </Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        if (!isLoading) {
                          setRating(star);
                          setTouchedFields((prev) => ({
                            ...prev,
                            rating: true,
                          }));
                        }
                      }}
                      onMouseEnter={() => !isLoading && setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`text-3xl ${
                        isLoading
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:scale-110"
                      }`}
                      disabled={isLoading}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {touchedFields.rating && errors.rating && (
                  <p className="text-sm text-red-500 mt-1">{errors.rating}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="comment"
                  className={errors.comment ? "text-red-600" : ""}
                >
                  Your Review <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    setTouchedFields((prev) => ({
                      ...prev,
                      comment: true,
                    }));
                  }}
                  rows={6}
                  className={`resize-none ${
                    errors.comment ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                  onBlur={() =>
                    setTouchedFields((prev) => ({ ...prev, comment: true }))
                  }
                />
                {touchedFields.comment && errors.comment && (
                  <p className="text-sm text-red-500 mt-1">{errors.comment}</p>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3 pt-2">
            <Label
              htmlFor="images"
              className={errors.images ? "text-red-600" : ""}
            >
              Event Photos <span className="text-red-500">*</span>
            </Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
                isLoading
                  ? "bg-gray-100 cursor-not-allowed"
                  : "hover:border-primary/70"
              } ${
                errors.images && touchedFields.images
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              onClick={() => !isLoading && fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <UploadCloud className="w-10 h-10 text-gray-400" />
                <p className="text-sm text-center text-muted-foreground">
                  Click to upload photos from the event
                  <br />
                  <span className="text-xs">
                    Required • PNG, JPG, GIF up to 10MB
                  </span>
                </p>
              </div>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
                disabled={isLoading}
              />
            </div>
            {touchedFields.images && errors.images && (
              <p className="text-sm text-red-500 mt-1">{errors.images}</p>
            )}

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                {imagePreviews.map((preview) => (
                  <div key={preview.url} className="relative aspect-square">
                    <img
                      src={preview.url}
                      alt="Event preview"
                      className="w-full h-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(preview.url)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:opacity-90"
                      disabled={isLoading}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <DialogFooter className="pt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
