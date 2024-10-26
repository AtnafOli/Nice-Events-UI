import api from "@/lib/api-client";
import { LoginResponse } from "@/types/api";
import { SignInCredentials } from "@/types/auth/sign-in";

export const authService = {
  signIn: async (credentials: SignInCredentials): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>(
      "/auth/sign-in",
      credentials
    );
    return data;
  },

  signOut: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  checkAuth: async () => {
    try {
      const { data } = await api.get<{ user: LoginResponse["data"]["user"] }>(
        "/auth/me"
      );
      return data;
    } catch (error) {
      return null;
    }
  },
};
