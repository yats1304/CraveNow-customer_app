import { StyleProp, ViewStyle } from "react-native";
import { IconName } from "../AppIcon/AppIcon.types";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  iconName?: IconName;
  onRetry?: () => void;
  retryLabel?: string;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
