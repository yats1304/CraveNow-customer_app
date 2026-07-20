import { Colors } from "@/components/theme";
import { Text } from "react-native";
import { AppTextProps } from "./Text.types";
import { textVariants } from "./textVariants";
import { cn } from "@/utils/cn";

export default function AppText({
  children,
  variant = "body",
  color = Colors.gray[900],
  align = "left",
  weight,
  style,
  className,
  ...props
}: AppTextProps) {
  const variantStyle = textVariants[variant];

  return (
    <Text
      {...props}
      className={cn(className)}
      style={[
        variantStyle,

        {
          color,
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
