import { Pressable, View, ActivityIndicator } from "react-native";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { CardProps } from "./Card.types";
import { cardVariants } from "./cardVariants";

export default function Card({
  children,
  variant = "outlined",
  header,
  footer,
  pressable = false,
  onPress,
  loading = false,
  disabled = false,
  style,
  className,
}: CardProps) {
  // Use Pressable if card is interactive, otherwise View
  const Container = pressable ? Pressable : View;

  return (
    <Container
      onPress={disabled || loading ? undefined : onPress}
      accessibilityRole={pressable ? "button" : undefined}
      accessibilityState={{ disabled: disabled || loading }}
      style={style}
      className={cn(
        "rounded-2xl overflow-hidden p-4 relative",
        cardVariants[variant],
        (disabled || loading) && "opacity-60",
        className
      )}
    >
      {header && (
        <View className="border-b border-gray-100/80 dark:border-neutral-700/80 pb-3 mb-3">
          {header}
        </View>
      )}

      <View className="flex-1">{children}</View>

      {footer && (
        <View className="border-t border-gray-100/80 dark:border-neutral-700/80 pt-3 mt-3">
          {footer}
        </View>
      )}

      {loading && (
        <View className="absolute inset-0 bg-white/60 dark:bg-neutral-900/60 justify-center items-center">
          <ActivityIndicator color={Colors.primary[500]} size="small" />
        </View>
      )}
    </Container>
  );
}
