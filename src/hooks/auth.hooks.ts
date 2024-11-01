"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { LoginResponse, User } from "@/types/api";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api-client";
import { getRouteByRole } from "@/lib/routes";
import { SignInCredentials } from "@/types/auth/sign-in";
import { useUser } from "@/context/userContext";

export function useAuth() {
  const router = useRouter();
  const { setUser } = useUser();

  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ["auth-session"],
    queryFn: authService.checkAuth,
  });

  const signInMutation = useMutation<
    LoginResponse["data"],
    ApiError,
    SignInCredentials
  >({
    mutationFn: (credentials) => authService.signIn(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      const redirectPath = getRouteByRole(data.user.role);
      router.push(redirectPath);
    },
  });

  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      router.push("/sign-in");
    },
  });

  return {
    signIn: signInMutation.mutate,
    signOut: signOutMutation.mutate,
    isLoading: signInMutation.isPending,
    isSessionLoading,
    error: signInMutation.error,
    session,
    user: session?.user,
  };
}
