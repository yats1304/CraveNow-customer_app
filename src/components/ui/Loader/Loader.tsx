import { Colors } from "@/components/theme";
import { cn } from "@/utils/cn";
import { ActivityIndicator, Modal, View } from "react-native";
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
  const isOverlay = variant === "overlay";

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

  if (isOverlay) {
    return (
      <Modal transparent animationType="fade" visible statusBarTranslucent>
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="bg-white dark:bg-neutral-800 rounded-2xl p-6 items-center shadow-xl border border-gray-100 dark:border-neutral-700 min-w-[220px]">
            <ActivityIndicator size={resolvedSize} color={color} />
            {text && (
              <AppText
                variant="bodySmall"
                className="text-gray-700 dark:text-gray-200 mt-3 text-center font-medium"
              >
                {text}
              </AppText>
            )}
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View
      style={style}
      className={cn(
        "flex-1 bg-white dark:bg-neutral-950 justify-center items-center",
        className,
      )}
    >
      {content}
    </View>
  );
}
