import { BaseEntity, ImageAsset } from "./common.types";

export interface Category extends BaseEntity {
  restaurantId?: string;
  name: string;
  slug?: string;
  description?: string;
  image?: ImageAsset;
  icon?: string;
  isActive: boolean;
}
