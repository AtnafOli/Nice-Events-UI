import api from "@/lib/api-client";
import { LoginResponse } from "@/types/api";
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

  signOut: async (): Promise<void> => {
    await api.get("/auth/sign-out");
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
};
