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
import {
  FaBriefcase,
  FaUser,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { SubscriptionCreateData } from "@/types/subscription";
import { VendorData } from "@/types/vendor";
import { ProfileData } from "@/types/profile";
import { useUser } from "@/context/userContext";
import { City } from "@/lib/city.enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Phone number validation pattern for Ethiopian numbers (9 digits after +251)
const phoneRegex = /^[0-9]{9}$/;

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Phone number must be exactly 9 digits"),
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters"),
  businessPhone: z
    .string()
    .regex(phoneRegex, "Phone number must be exactly 9 digits"),
  businessDescription: z
    .string()
    .min(5, "Business description must be at least 5 characters"),
  city: z.string().min(2, "Please select a city"),
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
  const { user } = useUser();
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

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
    setValue,
  } = form;

  // Function to format phone input with +251 prefix
  const formatPhoneWithPrefix = (value: string, field: any) => {
    // Remove any non-digits
    const digitsOnly = value.replace(/\D/g, "");
    // Limit to 9 digits
    const limitedDigits = digitsOnly.slice(0, 9);
    // Update the form value
    field.onChange(limitedDigits);
  };

  // Format the city enum for display
  const formatCityName = (city: string) => {
    return city
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Map numeric enum values to their string keys
  const cityOptions = Object.keys(City)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      value: key,
      label: formatCityName(key),
    }));

  function onSubmit(values: any) {
    const profileData: ProfileData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: "+251" + values.phoneNumber,
    };

    const vendorData: VendorData = {
      businessName: values.businessName,
      businessPhone: "+251" + values.businessPhone,
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
    <div className="scale-[0.94] min-h-screen md:p-6">
      <div className="transition-all duration-300 ease-in-out">
        <Card className="max-w-4xl mx-auto bg-white/40 lg:p-4 backdrop-blur-xl rounded-3xl shadow-xl border-0">
          <CardHeader className="space-y-6 pb-8">
            <div className="lg:space-y-3 space-y-1.5">
              <div className="flex justify-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FaBriefcase className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h1 className="text-xl md:text-4xl font-semibold text-center tracking-tight text-[#1d1d1f]">
                Vendor Registration
              </h1>
              <p className="text-center lg:text-lg text-xs text-[#86868b] max-w-2xl mx-auto leading-relaxed">
                Join NiceEvents as a service provider and showcase your services
                to potential clients. Please complete your business and personal
                details below.
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
                  <section className="space-y-8 lg:border-r lg:pr-8 lg:border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="lg:h-10 h-6 lg:w-10 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <FaUser className="lg:h-5 h-3.5 lg:w-5 w-3.5 text-primary" />
                      </div>
                      <h3 className="lg:text-xl text-base font-semibold text-[#1d1d1f]">
                        Personal Details
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
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
                                  className="h-12 rounded-xl border border-[#d2d2d7] bg-white/80
                                           focus:border-primary focus:ring-1 focus:ring-primary
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
                                  className="h-12 rounded-xl border border-[#d2d2d7] bg-white/80
                                           focus:border-primary focus:ring-1 focus:ring-primary
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
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <span className="text-gray-500">+251</span>
                                </div>
                                <Input
                                  className="h-12 rounded-xl border border-[#d2d2d7] bg-white/80
                                          focus:border-primary focus:ring-1 focus:ring-primary
                                          transition-all duration-200 pl-14"
                                  placeholder="9XXXXXXXX"
                                  type="tel"
                                  inputMode="numeric"
                                  value={field.value}
                                  onChange={(e) =>
                                    formatPhoneWithPrefix(e.target.value, field)
                                  }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <FaPhone className="text-gray-400 h-4 w-4" />
                                </div>
                              </div>
                            </FormControl>
                            <p className="text-[11px] text-gray-500 mt-1">
                              Enter 9 digits without country code
                            </p>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>

                  {/* Business Information Section */}
                  <section className="space-y-8">
                    <div className="flex items-center space-x-3">
                      <div className="lg:h-10 h-6 lg:w-10 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <FaBriefcase className="lg:h-5 h-3.5 lg:w-5 w-3.5 text-primary" />
                      </div>
                      <h3 className="lg:text-xl text-lg font-semibold text-[#1d1d1f]">
                        Business Details
                      </h3>
                    </div>

                    <div className="space-y-6">
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
                                className="h-12 rounded-xl border border-[#d2d2d7] bg-white/80
                                         focus:border-primary focus:ring-1 focus:ring-primary
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
                        name="businessPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-[#86868b]">
                              Business Phone
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  <span className="text-gray-500">+251</span>
                                </div>
                                <Input
                                  className="h-12 rounded-xl border border-[#d2d2d7] bg-white/80
                                          focus:border-primary focus:ring-1 focus:ring-primary
                                          transition-all duration-200 pl-14"
                                  placeholder="9XXXXXXXX"
                                  type="tel"
                                  inputMode="numeric"
                                  value={field.value}
                                  onChange={(e) =>
                                    formatPhoneWithPrefix(e.target.value, field)
                                  }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                  <FaPhone className="text-gray-400 h-4 w-4" />
                                </div>
                              </div>
                            </FormControl>
                            <p className="text-[11px] text-gray-500 mt-1">
                              Enter 9 digits without country code
                            </p>
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
                                className="min-h-[120px] rounded-xl border border-[#d2d2d7] bg-white/80
                                         focus:border-primary focus:ring-1 focus:ring-primary
                                         transition-all duration-200 resize-none"
                                placeholder="Describe your services, expertise, and what makes your business unique"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger
                                    className="h-12 rounded-xl border border-[#d2d2d7] bg-white/80
                                              focus:border-primary focus:ring-1 focus:ring-primary
                                              transition-all duration-200"
                                  >
                                    <SelectValue placeholder="Select city" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white/95 backdrop-blur-lg rounded-xl border-[#d2d2d7] shadow-lg">
                                    {cityOptions.map((city) => (
                                      <SelectItem
                                        key={city.value}
                                        value={city.value}
                                        className="cursor-pointer hover:bg-primary/5 transition-colors"
                                      >
                                        {city.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
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
                                <div className="relative">
                                  <Input
                                    className="h-12 rounded-xl border border-[#d2d2d7] bg-[#f5f5f7]
                                             text-[#86868b] cursor-not-allowed"
                                    disabled
                                    {...field}
                                  />
                                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <FaMapMarkerAlt className="text-gray-400 h-4 w-4" />
                                  </div>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </section>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <Button
                    type="submit"
                    className="w-full h-14 rounded-full font-medium text-base
                             bg-primary hover:bg-primary/90
                             text-white shadow-lg shadow-primary/20
                             transition-all duration-300 ease-out
                             hover:shadow-xl hover:shadow-primary/30
                             active:scale-[0.98]
                             disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
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
