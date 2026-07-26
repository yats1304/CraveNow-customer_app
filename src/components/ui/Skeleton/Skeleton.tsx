import { cn } from "@/utils/cn";
import { useEffect } from "react";
import { View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SkeletonProps } from "./Skeleton.types";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Skeleton({
  variant = "rectangle",
  width,
  height,
  borderRadius,
  style,
  className,
}: SkeletonProps) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    // Continuous breathing loop for shimmer effect
    opacity.value = withRepeat(withTiming(0.7, { duration: 850 }), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const isCircle = variant === "circle";
  const isText = variant === "text";

  const resolvedBorderRadius =
    borderRadius !== undefined
      ? borderRadius
      : isCircle
        ? 9999
        : isText
          ? 6
          : 12;

  const resolvedHeight = height !== undefined ? height : isText ? 14 : 50;

  return (
    <AnimatedView
      style={[
        animatedStyle,
        {
          width,
          height: resolvedHeight,
          borderRadius: resolvedBorderRadius,
        } as ViewStyle,
        style,
      ]}
      className={cn("bg-gray-200 dark:bg-neutral-800", className)}
    />
  );
}
