import { Text } from "react-native";
import { useColorScheme } from "nativewind";
import { Colors } from "@/components/theme";
import { AppTextProps } from "./Text.types";
import { textVariants } from "./textVariants";
import { cn } from "@/utils/cn";

export default function AppText({
  children,
  variant = "body",
  color,
  align = "left",
  weight,
  style,
  className,
  ...props
}: AppTextProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const variantStyle = textVariants[variant];

  let resolvedColor: string | undefined = undefined;

  if (color === "primary") {
    resolvedColor = Colors.primary[500];
  } else if (color === "secondary") {
    resolvedColor = isDark ? "#9CA3AF" : "#4B5563";
  } else if (color === "muted") {
    resolvedColor = isDark ? "#6B7280" : "#9CA3AF";
  } else if (color) {
    resolvedColor = color;
  }

  return (
    <Text
      {...props}
      className={cn(
        !resolvedColor && "text-neutral-900 dark:text-neutral-100",
        className
      )}
      style={[
        variantStyle,
        {
          ...(resolvedColor ? { color: resolvedColor } : {}),
          textAlign: align,
          fontWeight: weight ?? (variantStyle.fontWeight as any),
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
