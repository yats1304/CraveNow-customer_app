import { BaseEntity } from "./common.types";

export enum OrderStatus {
  AWAITING_PAYMENT = "AWAITING_PAYMENT",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  PREPARING = "PREPARING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum OrderCancelledBy {
  CUSTOMER = "CUSTOMER",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  COD = "COD",
  RAZORPAY = "RAZORPAY",
}

export interface OrderItem extends BaseEntity {
  orderId?: string;
  menuItemId: string;
  nameSnapshot: string;
  unitPriceSnapshot: number;
  quantity: number;
  totalPrice: number;
  specialInstructions?: string;
}

export interface Order extends BaseEntity {
  orderNumber: string;
  userId?: string;
  restaurantId?: string;
  addressId?: string;
  status: OrderStatus;
  cancelledAt?: string | Date;
  cancelledBy?: OrderCancelledBy;
  cancellationReason?: string;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  subtotal?: number;
  discount?: number;
  tax?: number;
  deliveryFee: number;
  total: number;
  estimatedDeliveryTime?: string | Date;
  notes?: string;
  items?: OrderItem[];
}
