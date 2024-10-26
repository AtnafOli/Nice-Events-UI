"use client";

import { useAuth } from "@/hooks/auth.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getRouteByRole } from "@/lib/routes";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, isSessionLoading, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && session && user) {
      console.log("user", user);
      const redirectPath = getRouteByRole(user.role);
      router.push(redirectPath);
    }
  }, [session, isSessionLoading, router, user]);

  if (isSessionLoading || session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return <>{children}</>;
}
