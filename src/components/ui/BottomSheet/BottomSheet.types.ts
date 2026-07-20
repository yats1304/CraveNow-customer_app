import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface BottomSheetProps {
  snapPoints?: (string | number)[];
  children: ReactNode;
  enablePanDownToClose?: boolean;
  onIndexChange?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
