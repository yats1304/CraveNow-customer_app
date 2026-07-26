import { View } from "react-native";
import { useColorScheme } from "nativewind";
import { cn } from "@/utils/cn";
import { AppText } from "../Text";
import { BadgeProps } from "./Badge.types";
import { badgeVariants, badgeSizes } from "./badgeVariants";

export default function Badge({
  children,
  variant = "secondary",
  size = "md",
  pill = false,
  style,
  className,
}: BadgeProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const variantStyle = badgeVariants[variant];
  const sizeStyle = badgeSizes[size];

  const textColor =
    isDark && variant === "secondary" ? "#E5E5E5" : variantStyle.textColor;

  return (
    <View
      style={style}
      className={cn(
        "justify-center items-center self-start border",
        pill ? "rounded-full" : "rounded-md",
        variantStyle.container,
        sizeStyle.container,
        className
      )}
    >
      {typeof children === "string" ? (
        <AppText
          variant={sizeStyle.textVariant}
          weight="600"
          style={{ color: textColor }}
        >
          {children}
        </AppText>
      ) : (
        children
      )}
    </View>
  );
}
