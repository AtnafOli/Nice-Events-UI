"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { LoginResponse, SignUpResponse, User } from "@/types/api";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api-client";
import { getRouteByRole } from "@/lib/routes";
import { SignInCredentials } from "@/types/auth/sign-in";
import { useUser } from "@/context/userContext";
import { useGoogleLogin } from "@react-oauth/google";

export function useAuth() {
  const router = useRouter();
  const { setUser } = useUser();

  // Function to get redirectUrl from current URL
  const getRedirectUrl = () => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("redirectUrl");
    }
    return null;
  };

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
      const redirectUrl = getRedirectUrl();
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        const redirectPath = getRouteByRole(data.user.role);
        router.push(redirectPath);
      }
    },
  });

  // Fixed SignUpMutation type
  const signUpMutation = useMutation<
    SignUpResponse,
    ApiError,
    SignInCredentials
  >({
    mutationFn: (credentials) => authService.signUp(credentials),
    onSuccess: (data) => {
      let verifyEmailUrl = `/verify-email?email=${encodeURIComponent(
        data.data.email
      )}`;

      // Check if there's a redirectUrl in the current URL
      const redirectUrl = getRedirectUrl();
      if (redirectUrl) {
        verifyEmailUrl += `&redirectUrl=${encodeURIComponent(redirectUrl)}`;
      }

      router.push(verifyEmailUrl);
    },
  });

  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      router.push("/sign-in");
    },
  });

  const googleSignInMutation = useMutation<
    LoginResponse["data"],
    ApiError,
    string
  >({
    mutationFn: (token) => authService.googleSignIn(token),
    onSuccess: (data) => {
      console.log(data);
      console.log("data is here*******8");
      setUser(data.user);

      // Check if there's a redirectUrl in the current URL
      const redirectUrl = getRedirectUrl();
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        const redirectPath = getRouteByRole(data.user.role);
        router.push(redirectPath);
      }
    },
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await googleSignInMutation.mutateAsync(tokenResponse.access_token);
      } catch (error) {
        console.error("Google login failed here:", error);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  return {
    signUp: signUpMutation.mutate,
    signIn: signInMutation.mutate,
    signOut: signOutMutation.mutate,
    googleSignIn: googleLogin,
    isLoading: signInMutation.isPending || googleSignInMutation.isPending,
    isSessionLoading,
    error:
      signUpMutation.error || signInMutation.error || signOutMutation.error,
    session,
    user: session?.user,
  };
}
