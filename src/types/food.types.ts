import { BaseEntity, ImageAsset } from "./common.types";

export enum FoodType {
  VEG = "VEG",
  NON_VEG = "NON_VEG",
  BOTH = "BOTH",
}

export interface Food extends BaseEntity {
  restaurantId: string;
  categoryId: string;
  name: string;
  slug?: string;
  description?: string;
  tags?: string[];
  images?: ImageAsset[];
  image?: string;
  price: number;
  discountPercentage?: number;
  finalPrice?: number;
  foodType?: FoodType;
  preparationTime?: number;
  rating?: number;
  isAvailable: boolean;
  isFeatured?: boolean;
  totalOrders?: number;
}

export type MenuItem = Food;
