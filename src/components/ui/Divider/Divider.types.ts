import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  orientation?: DividerOrientation;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
  children?: ReactNode; // Optional text label inside the divider
}
