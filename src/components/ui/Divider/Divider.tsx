import { View } from "react-native";
import { cn } from "@/utils/cn";
import { AppText } from "../Text";
import { DividerProps } from "./Divider.types";

export default function Divider({
  orientation = "horizontal",
  spacing,
  style,
  className,
  children,
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";
  const defaultSpacing =
    spacing !== undefined ? spacing : isHorizontal ? 16 : 8;

  // Render horizontal divider with text label in the middle
  if (isHorizontal && children) {
    return (
      <View
        style={[{ marginVertical: defaultSpacing }, style]}
        className={cn("flex-row items-center", className)}
      >
        <View className="flex-1 h-[1px] bg-gray-200" />
        <View className="px-3">
          {typeof children === "string" ? (
            <AppText variant="caption" className="text-gray-400 font-medium">
              {children}
            </AppText>
          ) : (
            children
          )}
        </View>
        <View className="flex-1 h-[1px] bg-gray-200" />
      </View>
    );
  }

  return (
    <View
      style={[
        isHorizontal
          ? {
              height: 1,
              width: "100%",
              marginVertical: defaultSpacing,
            }
          : {
              width: 1,
              height: "100%",
              marginHorizontal: defaultSpacing,
            },
        style,
      ]}
      className={cn("bg-gray-200", className)}
    />
  );
}
