import { StyleProp, ViewStyle } from "react-native";
import { ImageSource } from "expo-image";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  source?: string | ImageSource;
  name?: string; // Standard name for fallback initials (e.g. "John Doe" -> "JD")
  size?: AvatarSize;
  online?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
