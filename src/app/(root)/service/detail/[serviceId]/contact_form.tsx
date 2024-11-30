"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { addYears, startOfDay } from "date-fns";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(
      /^(\+?\d{1,4}[-.\s]?)?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Invalid phone number"
    )
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  eventDate: z.date({
    required_error: "Event date is required",
    invalid_type_error: "That's not a valid date",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm({
  vendorProfile,
  vendorFirstName,
  vendorLastName,
}: {
  vendorProfile: string;
  vendorFirstName: string;
  vendorLastName: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted:", data);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const customDatePickerStyles = `
    .react-datepicker {
      font-family: inherit;
      border: 1px solid hsl(20 5.9% 90%);
      border-radius: var(--radius);
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      background: hsl(0 0% 100%);
    }
    .react-datepicker__header {
      background-color: hsl(150 8% 90.5%);
      border-bottom: 1px solid hsl(20 5.9% 90%);
      border-top-left-radius: var(--radius);
      border-top-right-radius: var(--radius);
      padding-top: 0.5rem;
    }
    .react-datepicker__current-month {
      font-weight: 600;
      font-size: 1rem;
      color: hsl(240 50% 3.9%);
    }
    .react-datepicker__day-name {
      color: hsl(240 3.8% 46.1%);
      font-weight: 500;
    }
    .react-datepicker__day {
      color: hsl(240 10% 3.9%);
      border-radius: calc(var(--radius) * 0.5);
      transition: all 0.2s;
    }
    .react-datepicker__day:hover {
      background-color: hsl(150 15% 60%);
      color: hsl(240 5.9% 10%);
    }
    .react-datepicker__day--selected {
      background-color: hsl(20 55% 60%);
      color: hsl(60 7.1% 96.8%);
    }
    .react-datepicker__day--disabled {
      color: hsl(240 3.8% 46.1%);
    }
    .react-datepicker__navigation {
      top: 0.75rem;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: hsl(40 40% 60%);
      color: hsl(240 5.9% 10%);
    }
  `;

  return (
    <>
      <style>{customDatePickerStyles}</style>
      <Card className="w-full max-w-2xl mx-auto bg-white/95 shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
        <CardHeader className="p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-800">
              Message Vendor
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Required fields are marked with *
            </p>
          </div>
          <div className="flex items-center space-x-6 pt-6">
            <div className="relative w-16 h-16 overflow-hidden rounded-full ring-2 ring-primary/10">
              <Image
                src={vendorProfile || "/placeholder.png"}
                alt="Coordinator"
                width={200}
                height={200}
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {vendorFirstName + " " + vendorLastName}
              </h3>
              <p className="text-sm text-muted-foreground">Owner</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-gray-700 font-medium"
                >
                  First name *
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className={cn(
                    "mt-1 p-2 border border-gray-300 bg-transparent  transition-all duration-200",
                    errors.firstName && "border-red-500"
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-700 font-medium">
                  Last name *
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className={cn(
                    "mt-1 p-2 border border-gray-300 bg-transparent  transition-all duration-200",
                    errors.lastName && "border-red-500"
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={cn(
                  "mt-1 p-2 border border-gray-300 bg-transparent  transition-all duration-200",
                  errors.email && "border-red-500"
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="eventDate" className="text-gray-700 font-medium">
                Event date *
              </Label>
              <div className="relative">
                <Controller
                  control={control}
                  name="eventDate"
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      selected={value}
                      onChange={onChange}
                      minDate={startOfDay(new Date())}
                      maxDate={addYears(new Date(), 1)}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select event date"
                      className={cn(
                        "w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200",
                        errors.eventDate && "border-red-500"
                      )}
                      customInput={
                        <div className="relative w-full">
                          <Input
                            value={
                              value
                                ? value.toLocaleDateString()
                                : "Select event date"
                            }
                            readOnly
                            className="cursor-pointer pr-10"
                          />
                          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                      }
                    />
                  )}
                />
                {errors.eventDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.eventDate.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-gray-700 font-medium">
                Event details *
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                className={cn(
                  "mt-1 p-2 min-h-[120px] border border-gray-300 bg-transparent  transition-all duration-200",
                  errors.message && "border-red-500"
                )}
                placeholder="Please share your event details, preferences, and any special requirements..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="text-gray-700 font-medium">
                Phone number (optional)
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className={cn(
                  "mt-1 p-2 border border-gray-300 bg-transparent  transition-all duration-200",
                  errors.phone && "border-red-500"
                )}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                By clicking 'Request Quote', you agree to our{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Use
                </a>
                . See our{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>{" "}
                to learn how we handle your data.
              </p>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white hover:bg-primary/90 transition duration-300 py-6 text-lg font-medium rounded-lg"
              >
                {isSubmitting ? "Submitting..." : "Request Quote"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
