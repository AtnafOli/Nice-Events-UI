import { AddressData } from "../address";

export interface ProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address?: AddressData;
}
