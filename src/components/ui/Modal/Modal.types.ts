import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
}
