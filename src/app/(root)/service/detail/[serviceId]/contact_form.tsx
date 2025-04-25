"use client";

import { useState } from "react";
import { CalendarIcon, Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { addYears, startOfDay } from "date-fns";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { serviceRequestService } from "@/services/service-request.service";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\d{9}$/, "Enter 9 digits"),
  message: z.string().min(10).max(1000),
  eventDate: z.date(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm({
  vendorProfile,
  vendorFirstName,
  vendorLastName,
  vendorId,
  serviceId,
}: {
  vendorProfile: string;
  vendorFirstName: string;
  vendorLastName: string;
  vendorId: number;
  serviceId: number;
}) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      eventDate: undefined,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      await serviceRequestService.create({
        serviceId,
        vendorId: vendorId!,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: `+251${data.phone}`,
        eventDate: data.eventDate,
        eventDetails: data.message,
      });
      toast({
        title: "Quote Request Sent",
        description: `Your message has been sent to ${vendorFirstName}. They will contact you soon.`,
        variant: "default",
      });
      reset();
    } catch {
      toast({
        title: "Failed to Send Request",
        description:
          "There was a problem sending your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full  mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <CardHeader className="flex items-start gap-4 justify-between border-b border-gray-200 pb-2">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Request a Quote</h2>
          <p className="text-xs text-gray-600">Fields marked * are required</p>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
            <Image
              src={vendorProfile || "/placeholder.png"}
              alt={`${vendorFirstName} ${vendorLastName}`}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="ml-2 text-sm text-gray-700">
            {vendorFirstName} {vendorLastName}
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4 space-y-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {["firstName", "lastName"].map((field) => (
              <div key={field} className="space-y-1">
                <Label htmlFor={field} className="text-sm font-medium">
                  {field === "firstName" ? "First Name" : "Last Name"}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field}
                  {...register(field as keyof ContactFormData)}
                  className={cn(
                    "py-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50",
                    errors[field as keyof ContactFormData] && "border-red-500"
                  )}
                  placeholder={`${field}`}
                />
                {errors[field as keyof ContactFormData] && (
                  <p className="text-red-500 text-xs">
                    {errors[field as keyof ContactFormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <Label htmlFor="eventDate" className="text-sm font-medium">
              Event Date <span className="text-red-500">*</span>
            </Label>
            <Controller
              control={control}
              name="eventDate"
              render={({ field: { onChange, value } }) => (
                <div className="relative">
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    minDate={startOfDay(new Date())}
                    maxDate={addYears(new Date(), 2)}
                    dateFormat="MMM d, yyyy"
                    placeholderText="Select date"
                    className={cn(
                      "w-full py-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50",
                      errors.eventDate && "border-red-500"
                    )}
                    customInput={
                      <Input
                        readOnly
                        value={value ? value.toLocaleDateString("en-US") : ""}
                        className="cursor-pointer pr-8"
                      />
                    }
                    showPopperArrow={false}
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 w-4 h-4 text-gray-400 transform -translate-y-1/2" />
                </div>
              )}
            />
            {errors.eventDate && (
              <p className="text-red-500 text-xs">{errors.eventDate.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="message" className="text-sm font-medium">
              Event Details <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              {...register("message")}
              className={cn(
                "py-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y",
                errors.message && "border-red-500"
              )}
              placeholder="Share your event details..."
              rows={3}
            />
            {errors.message && (
              <p className="text-red-500 text-xs">{errors.message.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["phone", "email"].map((field) => (
              <div key={field} className="space-y-1">
                <Label htmlFor={field} className="text-sm font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field}
                  {...register(field as keyof ContactFormData)}
                  className={cn(
                    "py-2 text-sm border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50",
                    errors[field as keyof ContactFormData] && "border-red-500"
                  )}
                  placeholder={
                    field === "phone" ? "9xxxxxxxx" : "you@example.com"
                  }
                />
                {errors[field as keyof ContactFormData] && (
                  <p className="text-red-500 text-xs">
                    {errors[field as keyof ContactFormData]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-600">
            <p>
              By submitting, you agree to our{" "}
              <a href="#" className="font-medium hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <Button
              type="submit"
              disabled={submitting}
              className="w-full py-2 mt-3 text-sm font-semibold text-white bg-primary rounded-lg shadow hover:bg-primary-dark transition"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="ml-2">Sending...</span>
                </>
              ) : (
                "Request Quote"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="pt-2 border-t border-gray-200 text-xs text-center text-gray-500">
        Vendors typically respond within 24–48 hours
      </CardFooter>
    </Card>
  );
}
