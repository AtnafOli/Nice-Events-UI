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
  id: string;
  email: string;
  name: string;
  role: "admin" | "vendor" | "customer";
  Profile?: any;
  Subscriptions?: any[];
  PaymentMethod?: any[];
  Vendor?: any;
  status?: any;
  createdAt?: any;
}

export interface LoginResponse {
  data: {
    user: User;
  };
}
