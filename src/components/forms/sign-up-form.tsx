"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth.hooks";
import {
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Mail,
  Lock,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignUpCredentials } from "@/types/auth/sign-in";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

export default function SignInForm() {
  const { signUp, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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
      rePassword: "",
    },
  });

  const watchPassword = watch("password", "");

  const validatePassword = (password: string) => {
    const criteria = [
      { regex: /.{8,}/, description: "At least 8 characters" },
      { regex: /[A-Z]/, description: "At least one uppercase letter" },
      { regex: /[a-z]/, description: "At least one lowercase letter" },
    ];

    return criteria.map(({ regex, description }) => ({
      met: regex.test(password),
      description,
    }));
  };

  const onSubmit = async (data: SignUpCredentials) => {
    try {
      signUp(data);
    } catch (error) {}
  };

  const passwordCriteria = validatePassword(watchPassword);
  const passwordStrength = passwordCriteria.filter((c) => c.met).length;
  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 2) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto space-y-6 md:p-2 bg-transparent rounded-lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="flex items-center space-x-2 text-sm sm:text-base"
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </Label>
          <div className="relative">
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
              className={`w-full mt-1 bg-transparent border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm sm:text-base ${
                errors.email && "border-red-500 focus:ring-red-500"
              }`}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs sm:text-sm text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="flex items-center space-x-2 text-sm sm:text-base"
          >
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
              className="w-full mt-1 bg-transparent border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {watchPassword && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${getPasswordStrengthColor()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(passwordStrength / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-md space-y-2">
                {passwordCriteria.map((criteria, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-2 text-xs sm:text-sm"
                  >
                    {criteria.met ? (
                      <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                    )}
                    <span
                      className={
                        criteria.met ? "text-green-600" : "text-red-600"
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

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="rePassword"
            className="flex items-center space-x-2 text-sm sm:text-base"
          >
            <Lock className="h-4 w-4" />
            <span>Confirm Password</span>
          </Label>
          <div className="relative">
            <Input
              id="rePassword"
              type={showRePassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("rePassword", {
                validate: (value) =>
                  value === watchPassword || "Passwords don't match",
              })}
              className="w-full mt-1 bg-transparent border-gray-300 rounded-md focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={() => setShowRePassword(!showRePassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showRePassword ? (
                <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {errors.rePassword && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs sm:text-sm text-red-500"
              >
                {errors.rePassword.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert variant="destructive" className="animate-shake">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs sm:text-sm">
                  {error.message?.message || "An error occurred during sign up"}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary-600 transition-all duration-200 text-sm sm:text-base py-2 sm:py-3"
            disabled={isLoading || !isValid}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                <span>Creating account...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
