import api from "@/lib/api-client";
import { CreateHelp, Help, HelpResponse } from "@/types/help";

export const helpService = {
  async getHelp(): Promise<HelpResponse> {
    const response = await api.get<HelpResponse>("/help");
    return response.data;
  },
  async createHelp(data: CreateHelp) {
    const response = await api.post<Help>("/help", data);
    return response.data;
  },
  async seenHelp(id: number) {
    const response = await api.put<Help>("/help/seen/" + id);
    return response.data;
  },
};
