import { BaseEntity } from "./common.types";
import { Food } from "./food.types";

export interface CartItem extends Partial<BaseEntity> {
  cartId?: string;
  menuItemId?: string;
  food?: Food;
  quantity: number;
  unitPriceSnapshot?: number;
  specialInstructions?: string;
}

export interface Cart extends BaseEntity {
  userId: string;
  restaurantId: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  items?: CartItem[];
}
