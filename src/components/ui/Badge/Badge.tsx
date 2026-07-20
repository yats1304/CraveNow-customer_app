import { View } from "react-native";
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
  const variantStyle = badgeVariants[variant];
  const sizeStyle = badgeSizes[size];

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
          style={{ color: variantStyle.textColor }}
        >
          {children}
        </AppText>
      ) : (
        children
      )}
    </View>
  );
}
