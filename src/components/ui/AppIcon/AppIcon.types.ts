import { ComponentProps } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export type IconColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted"
  | "white"
  | "black";

export interface AppIconProps {
  name: IconName;
  size?: IconSize | number;
  color?: IconColor | string;
  className?: string;
}
