import { Colors } from "@/components/theme";
import { IconColor, IconSize } from "./AppIcon.types";

export const iconSizes: Record<IconSize, number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 40,
};

export const iconColors: Record<IconColor, string> = {
  primary: Colors.primary[500],
  secondary: Colors.secondary[500],
  success: Colors.success[500],
  warning: Colors.warning[500],
  danger: Colors.danger[500],
  info: Colors.info[500],
  muted: Colors.gray[500],
  white: Colors.white,
  black: Colors.black,
};
