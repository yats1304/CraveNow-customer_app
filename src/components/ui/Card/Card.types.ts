import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type CardVariant = "elevated" | "outlined" | "filled" | "ghost";

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  header?: ReactNode;
  footer?: ReactNode;
  pressable?: boolean;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
