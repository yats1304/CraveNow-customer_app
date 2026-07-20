import { StyleProp, ViewStyle } from "react-native";

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
