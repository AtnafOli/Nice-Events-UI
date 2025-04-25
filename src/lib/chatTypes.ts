export type EventAdviceFlow =
  | "INITIAL"
  | "ASKING_EVENT_TYPE"
  | "ASKING_GUEST_COUNT"
  | "ASKING_LOCATION"
  // | "READY"
  | "PROCESSING";
export type VendorMatchFlow =
  | "INITIAL"
  | "ASKING_SERVICE_TYPE"
  | "ASKING_BUDGET"
  | "ASKING_LOCATION"
  // | "READY"
  | "PROCESSING";
export type ConversationFlowState = EventAdviceFlow | VendorMatchFlow;

export type MessageType = "user" | "bot" | "info";

export interface Message {
  type: MessageType;
  text: string;
  id: string; // Add unique ID for key prop stability
}

export interface EventDetails {
  eventType: string;
  guestCount: number;
  location: string;
}

export interface VendorRequest {
  service: string;
  budget: number;
  location: string;
}

export type ActiveTab = "vendor" | "event";
