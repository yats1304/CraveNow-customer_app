import { View, ActivityIndicator } from "react-native";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { AppText } from "../Text";
import { LoaderProps } from "./Loader.types";

export default function Loader({
  variant = "inline",
  text,
  color = Colors.primary[500],
  size,
  style,
  className,
}: LoaderProps) {
  const isInline = variant === "inline";
  const isFullscreen = variant === "fullscreen";

  const resolvedSize = size || (isInline ? "small" : "large");

  const content = (
    <View className="justify-center items-center p-4">
      <ActivityIndicator size={resolvedSize} color={color} />
      {text && (
        <AppText
          variant="bodySmall"
          className="text-gray-500 mt-3 text-center font-medium"
        >
          {text}
        </AppText>
      )}
    </View>
  );

  if (isInline) {
    return (
      <View
        style={style}
        className={cn("justify-center items-center", className)}
      >
        {content}
      </View>
    );
  }

  return (
    <View
      style={style}
      className={cn(
        isFullscreen
          ? "flex-1 bg-white justify-center items-center"
          : "absolute inset-0 bg-black/40 justify-center items-center z-50",
        className
      )}
    >
      {content}
    </View>
  );
}
