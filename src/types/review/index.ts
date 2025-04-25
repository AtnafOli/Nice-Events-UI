export interface Review {
  id: number;
  comment: string;
  rating: number;
  eventDate: Date;
  fullName: string;
  serviceId: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateReview {
  comment: string;
  rating: number;
  eventDate: Date;
  fullName: string;
  serviceId: number;
  images: File[];
}

export interface UpdateReview {
  id: number;
  comment?: string;
  rating?: number;
  eventDate?: Date;
  status?: "pending" | "approved" | "rejected";
}

export interface ReviewResponse {
  data: Review[];
}
