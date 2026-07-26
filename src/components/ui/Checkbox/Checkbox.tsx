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
import { AppIcon } from "../AppIcon";
import { CheckboxProps } from "./Checkbox.types";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Checkbox({
  checked,
  onChange,
  indeterminate = false,
  disabled = false,
  label,
  error,
  style,
  className,
}: CheckboxProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(checked || indeterminate ? 1 : 0.95, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
      backgroundColor: withTiming(
        checked || indeterminate
          ? disabled
            ? Colors.gray[300]
            : Colors.primary[500]
          : "transparent"
      ),
      borderColor: withTiming(
        checked || indeterminate
          ? disabled
            ? Colors.gray[300]
            : Colors.primary[500]
          : error
          ? Colors.danger[500]
          : isDark
          ? Colors.gray[700]
          : Colors.gray[300]
      ),
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(checked || indeterminate ? 1 : 0, { duration: 150 }),
      transform: [
        {
          scale: withSpring(checked || indeterminate ? 1 : 0.5, {
            damping: 12,
          }),
        },
      ],
    };
  });

  return (
    <View style={style} className={cn("flex-col mb-4", className)}>
      <Pressable
        onPress={disabled ? undefined : () => onChange(!checked)}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        className="flex-row items-center"
      >
        <AnimatedView
          style={animatedBoxStyle}
          className="w-6 h-6 rounded-md border justify-center items-center"
        >
          <AnimatedView style={animatedIconStyle}>
            <AppIcon
              name={indeterminate ? "remove" : "checkmark"}
              size={16}
              color="white"
            />
          </AnimatedView>
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

      {error && (
        <AppText variant="caption" className="text-danger mt-1.5 ml-9">
          {error}
        </AppText>
      )}
    </View>
  );
}
