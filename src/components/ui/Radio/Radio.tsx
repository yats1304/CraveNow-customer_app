import { Pressable, View } from "react-native";
import { useColorScheme } from "nativewind";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { AppText } from "../Text";
import { RadioProps } from "./Radio.types";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Radio({
  selected,
  onChange,
  disabled = false,
  label,
  style,
  className,
}: RadioProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedOuterStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(
        selected
          ? disabled
            ? Colors.gray[300]
            : Colors.primary[500]
          : isDark
          ? Colors.gray[700]
          : Colors.gray[300]
      ),
    };
  });

  const animatedInnerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(selected ? 1 : 0, {
            damping: 12,
            stiffness: 150,
          }),
        },
      ],
      opacity: withTiming(selected ? 1 : 0, { duration: 150 }),
    };
  });

  return (
    <Pressable
      onPress={disabled ? undefined : () => onChange(!selected)}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      style={style}
      className={cn("flex-row items-center mb-4", className)}
    >
      <AnimatedView
        style={animatedOuterStyle}
        className="w-6 h-6 rounded-full border-2 justify-center items-center bg-transparent"
      >
        <AnimatedView
          style={animatedInnerStyle}
          className={cn(
            "w-3 h-3 rounded-full",
            disabled ? "bg-gray-300 dark:bg-neutral-600" : "bg-primary"
          )}
        />
      </AnimatedView>

      {label && (
        <AppText
          variant="body"
          className={cn(
            "ml-3",
            disabled
              ? "text-gray-400 dark:text-neutral-500"
              : "text-gray-900 dark:text-gray-100"
          )}
        >
          {label}
        </AppText>
      )}
    </Pressable>
  );
}
