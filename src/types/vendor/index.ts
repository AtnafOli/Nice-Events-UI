import { AddressData } from "../address";
import { User } from "../api";

export interface VendorData {
  businessName: string;
  businessPhone: string;
  businessDescription: string;
  address: AddressData;
  user?: User;
}
