"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, UserCheck } from "lucide-react";
import { useAuth } from "@/hooks/auth.hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

type SignUpCredentials = {
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export default function VendorRegistrationForm() {
  const { signUp, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpCredentials>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "vendor",
    },
  });

  const watchPassword = watch("password", "");

  const validatePassword = (password: string) => {
    const criteria = [
      { regex: /.{8,}/, description: "At least 8 characters" },
      { regex: /[A-Z]/, description: "At least one uppercase letter" },
      { regex: /[a-z]/, description: "At least one lowercase letter" },
      { regex: /[0-9]/, description: "At least one number" },
    ];

    return criteria.map(({ regex, description }) => ({
      met: regex.test(password),
      description,
    }));
  };

  const onSubmit = async (data: SignUpCredentials) => {
    try {
      signUp(data);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  const passwordCriteria = validatePassword(watchPassword);
  const passwordStrength = passwordCriteria.filter((c) => c.met).length;
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 2) return "bg-yellow-500";
    if (passwordStrength <= 3) return "bg-green-500";
    return "bg-green-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mx-auto space-y-6  rounded-lg py-4 "
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={
              errors.email
                ? "border-destructive"
                : "bg-transparent  border-gray-300"
            }
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Password</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className={
                errors.password
                  ? "border-destructive"
                  : "bg-transparent  border-gray-300"
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive"
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>

          {watchPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${getPasswordStrengthColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="bg-muted p-3 rounded-md space-y-1">
                {passwordCriteria.map((criteria, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 text-sm"
                  >
                    {criteria.met ? (
                      <div className="h-4 w-4 rounded-full bg-green-500" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span
                      className={
                        criteria.met
                          ? "text-green-600"
                          : "text-muted-foreground"
                      }
                    >
                      {criteria.description}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirmPassword"
            className="flex items-center space-x-2"
          >
            <Lock className="h-4 w-4" />
            <span>Confirm Password</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watchPassword || "Passwords do not match",
              })}
              className={
                errors.confirmPassword
                  ? "border-destructive"
                  : "bg-transparent  border-gray-300"
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-sm text-destructive"
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role" className="flex items-center space-x-2">
            <UserCheck className="h-4 w-4" />
            <span>Role</span>
          </Label>
          <Input
            id="role"
            type="text"
            value="Vendor"
            readOnly
            className="bg-muted cursor-not-allowed"
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert variant="destructive">
                <AlertDescription>
                  {error.message.message || "An error occurred during sign up"}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading || !isValid}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-t-2 border-b-2 border-current rounded-full animate-spin" />
              <span>Creating account...</span>
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </motion.div>
  );
}
