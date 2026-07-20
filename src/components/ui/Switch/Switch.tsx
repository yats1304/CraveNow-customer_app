import { Pressable, View, ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { SwitchProps } from "./Switch.types";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function Switch({
  value,
  onChange,
  disabled = false,
  loading = false,
  style,
  className,
}: SwitchProps) {
  const animatedTrackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        value
          ? disabled
            ? Colors.primary[200]
            : Colors.primary[500]
          : disabled
          ? Colors.gray[200]
          : Colors.gray[300]
      ),
    };
  });

  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(value ? 20 : 0, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={disabled || loading ? undefined : () => onChange(!value)}
      disabled={disabled || loading}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: disabled || loading }}
      style={style}
      className={cn(
        "w-[52px] h-8 rounded-full justify-center p-[3px] overflow-hidden",
        className
      )}
    >
      <AnimatedView
        style={animatedTrackStyle}
        className="absolute inset-0 rounded-full"
      />
      <AnimatedView
        style={animatedThumbStyle}
        className="w-[26px] h-[26px] rounded-full bg-white justify-center items-center shadow-sm shadow-black/20"
      >
        {loading && (
          <ActivityIndicator
            size="small"
            color={value ? Colors.primary[500] : Colors.gray[400]}
            style={{ transform: [{ scale: 0.7 }] }}
          />
        )}
      </AnimatedView>
    </Pressable>
  );
}
