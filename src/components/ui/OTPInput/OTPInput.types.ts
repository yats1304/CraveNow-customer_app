import { StyleProp, ViewStyle } from "react-native";

export interface OTPInputProps {
  length?: 4 | 6;
  onComplete: (code: string) => void;
  error?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
