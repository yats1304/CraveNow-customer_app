import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "primary"
  | "secondary";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean; // Rounded-full pill style if true, standard rounded otherwise
  style?: StyleProp<ViewStyle>;
  className?: string;
}
