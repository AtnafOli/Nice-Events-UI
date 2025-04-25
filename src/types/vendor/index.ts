import { AddressData } from "../address";
import { User } from "../api";

export interface VendorData {
  id: number;
  businessName: string;
  businessPhone: string;
  businessDescription: string;
  address: AddressData;
  user?: User;
}
