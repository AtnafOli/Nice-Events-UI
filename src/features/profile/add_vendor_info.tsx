import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { FaBriefcase, FaUser, FaChevronRight } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCreateData } from "@/types/subscription";
import { VendorData } from "@/types/vendor";
import { ProfileData } from "@/types/profile";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessPhone: z
    .string()
    .min(10, "Business phone must be at least 10 digits"),
  businessDescription: z
    .string()
    .min(5, "Business description must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.literal("Ethiopia"),
});

export function VendorForm({
  onSuccess,
}: {
  onSuccess: (data: {
    profileData: ProfileData;
    vendorData: VendorData;
  }) => void;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      businessName: "",
      businessPhone: "",
      businessDescription: "",
      city: "",
      country: "Ethiopia",
    },
  });

  const router = useRouter();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  function onSubmit(values: any) {
    const profileData: ProfileData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
    };

    const vendorData: VendorData = {
      businessName: values.businessName,
      businessPhone: values.businessPhone,
      businessDescription: values.businessDescription,
      address: {
        city: values.city,
        country: values.country,
      },
    };

    const data = {
      profileData,
      vendorData,
    };

    onSuccess({ ...data });
  }

  return (
    <div className="min-h-screen md:p-12 p-4">
      <div className="transition-all duration-300 ease-in-out">
        <Card className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border-0">
          <CardHeader className="space-y-6 pb-8">
            <div className="lg:space-y-3 space-y-1">
              <h1 className="text-xl md:text-4xl font-semibold text-center tracking-tight text-[#1d1d1f]">
                Vendor Registration
              </h1>
              <p className="text-center lg:text-lg text-sm text-[#86868b] max-w-2xl mx-auto leading-relaxed">
                Please enter your business and personal information detial and
                join NiceEvents as a service provider and showcase your
                services.
              </p>
            </div>
          </CardHeader>
          <CardContent className="lg:pb-12 pb-6">
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="lg:space-y-10 space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                  {/* Personal Information Section */}
                  <section className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="lg:h-10 h-6 lg:w-10 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <FaUser className="lg:h-5 h-3.5 lg:w-5 w-3.5 text-primary" />
                      </div>
                      <h3 className="lg:text-xl text-base font-semibold text-[#1d1d1f]">
                        Personal Details
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-[#86868b]">
                                First Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="h-11 rounded-xl border border-[#d2d2d7] bg-white/50
                                           focus:border-primary focus:ring-0
                                           transition-all duration-200"
                                  placeholder="Enter first name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-[#86868b]">
                                Last Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="h-11 rounded-xl border border-[#d2d2d7] bg-white/50
                                           focus:border-primary focus:ring-0
                                           transition-all duration-200"
                                  placeholder="Enter last name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#86868b]">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="h-11 rounded-xl border border-[#d2d2d7] bg-white/50
                                         focus:border-primary focus:ring-0
                                         transition-all duration-200"
                                placeholder="+251 XX XXX XXXX"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Business Information Section */}
                  <section className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="lg:h-10 h-6 lg:w-10 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <FaBriefcase className="lg:h-5 h-3.5 lg:w-5 w-3.5 text-primary" />
                      </div>
                      <h3 className="lg:text-xl text-lg font-semibold text-[#1d1d1f]">
                        Business Details
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#86868b]">
                              Business Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="h-11 rounded-xl border border-[#d2d2d7] bg-white/50
                                         focus:border-primary focus:ring-0
                                         transition-all duration-200"
                                placeholder="Enter business name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#86868b]">
                              Business Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="h-11 rounded-xl border border-[#d2d2d7] bg-white/50
                                         focus:border-primary focus:ring-0
                                         transition-all duration-200"
                                placeholder="Brief description of your business"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="businessPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#86868b]">
                              Business Phone
                            </FormLabel>
                            <FormControl>
                              <Input
                                className="h-11 rounded-xl border border-[#d2d2d7] bg-white/50
                                         focus:border-primary focus:ring-0
                                         transition-all duration-200"
                                placeholder="+251 XX XXX XXXX"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-[#86868b]">
                                  City
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="h-11 rounded-xl border border-[#d2d2d7] bg-white/50
                                             focus:border-primary focus:ring-0
                                             transition-all duration-200"
                                    placeholder="Enter city"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-[#86868b]">
                                  Country
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className="h-11 rounded-xl border border-[#d2d2d7] bg-[#f5f5f7]
                                             text-[#86868b] cursor-not-allowed"
                                    disabled
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-full font-medium text-base
                             bg-primary
                             transition-all duration-300 ease-out
                             hover:opacity-90 active:scale-[0.98]
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-1.5">
                        <span>Complete Registration</span>
                        <FaChevronRight className="h-3 w-3" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
