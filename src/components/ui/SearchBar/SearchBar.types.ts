import { StyleProp, ViewStyle } from "react-native";
import { InputProps } from "../Input/Input.types";

export interface SearchBarProps extends Omit<InputProps, "leftIcon" | "rightIcon"> {
  value: string;
  onChangeText: (text: string) => void;
  loading?: boolean;
  onClear?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  className?: string;
}
