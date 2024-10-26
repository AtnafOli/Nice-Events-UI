"use client";

import { useAuth } from "@/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "@/types/api";
import { getRouteByRole } from "@/lib/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: User["role"][];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { session, isSessionLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading) {
      if (!session) {
        router.push("/sign-in");
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        const redirectPath = getRouteByRole(user.role);
        router.push(redirectPath);
      }
    }
  }, [session, isSessionLoading, router, allowedRoles, user]);

  if (isSessionLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!session || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
