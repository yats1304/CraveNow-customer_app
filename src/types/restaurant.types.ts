import { BaseEntity, ImageAsset } from "./common.types";

export enum RestaurantType {
  VEG = "VEG",
  NON_VEG = "NON_VEG",
  BOTH = "BOTH",
}

export interface Restaurant extends BaseEntity {
  ownerId?: string;
  name: string;
  description?: string;
  logo?: ImageAsset | string;
  banner?: ImageAsset | string;
  primaryAddressId?: string | null;
  restaurantType?: RestaurantType;
  cuisineIds?: string[];
  gstNumber?: string;
  fssaiLicenseNumber?: string;
  minimumOrderAmount?: number;
  deliveryRadius?: number;
  averagePreparationTime?: number;
  deliveryTime?: number;
  averageRating?: number;
  rating?: number;
  totalReviews?: number;
  deliveryFee?: number;
  distance?: number;
  isOpen: boolean;
  isVerified?: boolean;
  totalCompletedOrders?: number;
  todayCompletedOrders?: number;
  address?: string;
}
