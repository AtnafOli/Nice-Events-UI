"use client";

import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

interface AddProfileFormProps {
  onSuccess: () => void;
}

const AddProfileForm = ({ onSuccess }: AddProfileFormProps) => {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      city: "",
      country: "",
      avatarUrl: "",
    },
  });

  const onSubmit = (data: any) => {
    onSuccess();
    console.log(data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-primary mb-4">
        Add Profile
      </h2>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <ProfileFormField name="firstName" label="First Name" />
          <ProfileFormField name="lastName" label="Last Name" />
          <ProfileFormField name="phoneNumber" label="Phone Number" />
          <ProfileFormField name="city" label="City" />
          <ProfileFormField name="country" label="Country" />
          <ProfileFormField name="avatarUrl" label="Avatar URL" />

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              Save Profile
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

function ProfileFormField({ name, label }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <FormLabel htmlFor={name} className="block text-sm text-gray-700">
        {label}
      </FormLabel>
      <Input
        id={name}
        {...register(name, { required: "This field is required" })}
        className={`mt-1 block w-full border border-gray-300 rounded-md focus:ring-primary focus:border-primary ${
          errors[name] ? "border-red-500" : ""
        }`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}

export default AddProfileForm;
