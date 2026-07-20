import { ReactNode } from "react";
import { TextProps } from "react-native";
import { TextVariant } from "./textVariants";

export interface AppTextProps extends TextProps {
  children: ReactNode;
  variant?: TextVariant;
  color?: string;
  align?: "left" | "center" | "right";
  weight?: "400" | "500" | "600" | "700";
  numberOfLines?: number;
  className?: string;
}
