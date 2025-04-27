export interface Help {
  id: number;
  eventType: string;
  fullName: string;
  phoneNumber: string;
  eventDate: string;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateHelp {
  eventType: string;
  fullName: string;
  phoneNumber: string;
  eventDate: string;
}
export interface HelpResponse {
  data: Help[];
}
