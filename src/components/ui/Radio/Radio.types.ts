import { StyleProp, ViewStyle } from "react-native";

export interface RadioProps {
  selected: boolean;
  onChange: (selected: boolean) => void;
  disabled?: boolean;
  label?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
