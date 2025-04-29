import api from "@/lib/api-client";
import {
  LoginResponse,
  SignUpResponse,
  User,
  UsersResponse,
} from "@/types/api";
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

    const { data } = await api.post<LoginResponse>(
      "/auth/google/signin",
      {
        token,
      },
      {
        withCredentials: true,
      }
    );

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

  resetPassword: async ({
    email,
    code,
    newPassword,
  }: {
    email: string;
    code: string;
    newPassword: string;
  }): Promise<void> => {
    await api.put("/auth/reset-password", { email, code, newPassword });
  },

  requestPasswordReset: async ({ email }: { email: string }): Promise<void> => {
    await api.post("/auth/request-reset-password", { email });
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

  getAllUsers: async (): Promise<UsersResponse["data"]> => {
    const { data } = await api.get("/auth/users");
    console.log(data);
    return data;
  },

  blockUser: async (userId: number) => {
    const { data } = await api.put(`/auth/users/${userId}/block`);
    return data;
  },

  unblockUser: async (userId: number) => {
    const { data } = await api.put(`/auth/users/${userId}/unblock`);
    return data;
  },

  resendVerificationCode: async (email: string): Promise<any> => {
    const res = await api.post("/auth/resend-verification-code", { email });
    console.log(res);
    return res;
  },
};
