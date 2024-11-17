import api from "@/lib/api-client";
import { LoginResponse, SignUpResponse } from "@/types/api";
import { SignInCredentials } from "@/types/auth/sign-in";

export const authService = {
  signIn: async (
    credentials: SignInCredentials
  ): Promise<LoginResponse["data"]> => {
    const { data } = await api.post<LoginResponse>(
      "/auth/sign-in",
      credentials
    );

    return data.data;
  },

  signUp: async (credentials: SignInCredentials): Promise<SignUpResponse> => {
    const { data } = await api.post<SignUpResponse>(
      "/auth/sign-up",
      credentials
    );

    return data;
  },

  googleSignIn: async (token: string): Promise<LoginResponse["data"]> => {
    console.log(token);

    const { data } = await api.post<LoginResponse>("/auth/google/signin", {
      token,
    });

    return data.data;
  },

  signOut: async (): Promise<void> => {
    await api.get("/auth/sign-out");
  },

  verifyEmail: async ({
    email,
    code,
  }: {
    email: string;
    code: string;
  }): Promise<void> => {
    await api.put("/auth/verify", { email, code });
  },

  checkAuth: async () => {
    try {
      const { data } = await api.get<{ data: LoginResponse["data"] }>(
        "/auth/me"
      );

      return data.data;
    } catch (error) {
      return null;
    }
  },

  resendVerificationCode: async (email: string): Promise<any> => {
    const res = await api.post("/auth/resend-verification-code", { email });
    console.log(res);
    return res;
  },
};
