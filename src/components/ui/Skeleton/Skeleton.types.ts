import { StyleProp, ViewStyle } from "react-native";

export type SkeletonVariant = "rectangle" | "circle" | "text";

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: number | string;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
