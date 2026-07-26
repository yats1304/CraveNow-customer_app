import { Pressable, View } from "react-native";
import { useColorScheme } from "nativewind";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { AppText } from "../Text";
import { ButtonProps } from "./Button.types";
import ButtonLoader from "./ButtonLoader";
import { buttonSizes } from "./buttonSizes";
import { buttonVariants } from "./buttonVariants";
import { cn } from "@/utils/cn";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  className,
  onPress,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(1);
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const variantStyle = buttonVariants[variant];
  const sizeStyle = buttonSizes[size];

  let backgroundColor = variantStyle.backgroundColor;
  let borderColor = variantStyle.borderColor;
  let textColor = variantStyle.textColor;

  if (isDark) {
    if (variant === "secondary") {
      backgroundColor = "#262626";
      borderColor = "#262626";
      textColor = "#F5F5F5";
    } else if (variant === "outline") {
      backgroundColor = "transparent";
      borderColor = "#404040";
      textColor = "#F5F5F5";
    }
  }

  return (
    <AnimatedPressable
      {...props}
      className={cn(className)}
      disabled={disabled || loading}
      onPressIn={() => {
        // eslint-disable-next-line react-hooks/immutability
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        // eslint-disable-next-line react-hooks/immutability
        scale.value = withSpring(1);
      }}
      onPress={onPress}
      style={[
        animatedStyle,
        {
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          borderRadius: sizeStyle.borderRadius,
          backgroundColor,
          borderWidth: 1,
          borderColor,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: fullWidth ? "100%" : undefined,
          opacity: disabled || loading ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
          <ButtonLoader color={textColor} />
          <View style={{ marginLeft: 8 }}>
            <AppText variant="button" color={textColor}>
              {children}
            </AppText>
          </View>
        </View>
      ) : (
        <>
          {leftIcon}

          <View
            style={{
              marginHorizontal: 6,
            }}
          >
            <AppText variant="button" color={textColor}>
              {children}
            </AppText>
          </View>

          {rightIcon}
        </>
      )}
    </AnimatedPressable>
  );
}
