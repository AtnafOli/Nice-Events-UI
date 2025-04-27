import { VendorData } from "./vendor";

export interface ApiErrorResponse {
  error?: string;
  message?: any;
  statusCode?: number;
}

export interface ApiSuccessResponse<T> {
  sucess: boolean;
  data: T;
  message?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "vendor" | "customer";
  Profile?: any;
  Subscriptions?: any[];
  PaymentMethod?: any[];
  Vendor?: VendorData;
  status?: any;
  createdAt?: any;
}

export interface UsersResponse {
  data: User[];
}
export interface LoginResponse {
  data: {
    user: User;
  };
}

export interface SignUpResponse {
  data: User;
}
