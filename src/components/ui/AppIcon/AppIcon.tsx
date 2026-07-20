import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { cn } from "@/utils/cn";
import { AppIconProps } from "./AppIcon.types";
import { iconColors, iconSizes } from "./iconVariants";

export default function AppIcon({
  name,
  size = "md",
  color = "muted",
  className,
}: AppIconProps) {
  // Resolve size value (supports numeric values or standard keys)
  const resolvedSize = typeof size === "number" ? size : iconSizes[size];

  // Resolve color value (supports hex/named values or standard keys)
  const resolvedColor =
    color in iconColors ? iconColors[color as keyof typeof iconColors] : color;

  return (
    <View className={cn("justify-center items-center", className)}>
      <Ionicons name={name} size={resolvedSize} color={resolvedColor} />
    </View>
  );
}
