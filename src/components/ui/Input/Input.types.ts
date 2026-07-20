import { ReactNode } from "react";
import { StyleProp, TextInputProps, ViewStyle } from "react-native";

export type InputVariant = "outlined" | "filled" | "underlined";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  invalid?: boolean;
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  className?: string;
}
