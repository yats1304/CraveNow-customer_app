import { BaseEntity } from "./common.types";

export enum AddressLabel {
  HOME = "HOME",
  WORK = "WORK",
  OTHER = "OTHER",
}

export interface GeoLocation {
  type: "Point";
  coordinates: [longitude: number, latitude: number];
}

export interface Address extends BaseEntity {
  userId?: string;
  label?: AddressLabel;
  title?: string;
  fullName?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  address?: string;
  location?: GeoLocation;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
}
