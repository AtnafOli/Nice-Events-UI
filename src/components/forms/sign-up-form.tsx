"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth.hooks";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignInCredentials, SignUpCredentials } from "@/types/auth/sign-in";
import { useForm } from "react-hook-form";

function SignInForm() {
  const { signUp, isLoading, error } = useAuth();
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignUpCredentials>();

  const onSubmit = async (data: SignUpCredentials) => {
    let email = getValues("email");
    let password = getValues("password");
    let repassword = getValues("rePassword");

    if (email.trim().length == 0) {
      setError("email", {
        message: "This field is required",
      });
    }
    if (password.trim().length == 0) {
      setError("email", {
        message: "This field is required",
      });
    }
    if (password !== repassword) {
      setError("rePassword", {
        message: "The password does't match",
        type: "validate",
      });

      return;
    }
    signUp(data);
    reset();
  };

  return (
    <div className="w-full bg-transparent mx-auto space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message?.message || "An error occurred during sign in"}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={`w-full mt-1 bg-transparent border-gray-300 rounded-md focus:ring-2 focus:ring-primary ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className={`w-full mt-1 bg-transparent border-gray-300 rounded-md focus:ring-2 focus:ring-primary ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Re Enter Password
          </Label>
          <Input
            id="re-password"
            type="re-password"
            placeholder="Enter your password"
            {...register("rePassword")}
            className={`w-full mt-1 bg-transparent border-gray-300 rounded-md focus:ring-2 focus:ring-primary ${
              errors.rePassword ? "border-red-500" : ""
            }`}
          />
          {errors.rePassword && (
            <p className="text-sm text-red-500">{errors.rePassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-white hover:bg-primary-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
              Creating account...
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </div>
  );
}

export default SignInForm;
