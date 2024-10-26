import { AuthGuard } from "@/components/auth/authGuard";
import SignInForm from "@/components/forms/sign-in-form";
import React from "react";

const SignInPage: React.FC = () => {
  return (
    <AuthGuard>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-semibold text-center text-foreground">
            Sign In
          </h2>
          <SignInForm />

          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </AuthGuard>
  );
};

export default SignInPage;
