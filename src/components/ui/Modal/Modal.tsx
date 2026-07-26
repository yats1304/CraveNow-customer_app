import { Modal as RNModal, Pressable, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { AppText } from "../Text";
import { AppIcon } from "../AppIcon";
import { ModalProps } from "./Modal.types";

export default function Modal({
  visible,
  onClose,
  title,
  subtitle,
  children,
  footer,
  closeOnBackdrop = true,
  style,
  className,
}: ModalProps) {
  return (
    <RNModal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <View className="flex-1 justify-end items-center">
        {/* Backdrop overlay */}
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(150)}
          className="absolute inset-0 bg-black/50"
        >
          <Pressable
            className="flex-1"
            onPress={closeOnBackdrop ? onClose : undefined}
          />
        </Animated.View>

        {/* Modal card content container */}
        <Animated.View
          entering={SlideInDown.duration(300).springify().damping(18)}
          exiting={SlideOutDown.duration(200)}
          style={style}
          className={cn(
            "bg-white dark:bg-neutral-900 w-full rounded-t-[28px] p-6 max-h-[85%] pb-10 shadow-xl relative z-10",
            className
          )}
        >
          {/* Header */}
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 pr-4">
              {title && (
                <AppText variant="h3" weight="700">
                  {title}
                </AppText>
              )}
              {subtitle && (
                <AppText variant="bodySmall" color={Colors.gray[500]} className="mt-1">
                  {subtitle}
                </AppText>
              )}
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={8}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-neutral-800 justify-center items-center"
              accessibilityRole="button"
              accessibilityLabel="Close dialog"
            >
              <AppIcon name="close" size={18} color={Colors.gray[500]} />
            </Pressable>
          </View>

          {/* Content */}
          <View className="mb-5">{children}</View>

          {/* Footer */}
          {footer && <View className="mt-2">{footer}</View>}
        </Animated.View>
      </View>
    </RNModal>
  );
}
