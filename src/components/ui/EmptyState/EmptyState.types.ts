import { StyleProp, ViewStyle } from "react-native";
import { IconName } from "../AppIcon/AppIcon.types";

export interface EmptyStateProps {
  title: string;
  description?: string;
  iconName?: IconName;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
