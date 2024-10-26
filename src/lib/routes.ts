import { User } from "@/types/api";

export const ROLE_ROUTES = {
  admin: "/admin/dashboard",
  vendor: "/vendor/dashboard",
  customer: "/",
} as const;

export function getRouteByRole(role: User["role"]): string {
  return ROLE_ROUTES[role];
}
