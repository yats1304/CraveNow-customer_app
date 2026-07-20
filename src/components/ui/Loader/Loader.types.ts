import { StyleProp, ViewStyle } from "react-native";

export type LoaderVariant = "inline" | "fullscreen" | "overlay";

export interface LoaderProps {
  variant?: LoaderVariant;
  text?: string;
  color?: string;
  size?: "small" | "large";
  style?: StyleProp<ViewStyle>;
  className?: string;
}
