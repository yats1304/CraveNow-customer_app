import { View } from "react-native";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { AppText } from "../Text";
import { AppIcon } from "../AppIcon";
import { Button } from "../Button";
import { ErrorStateProps } from "./ErrorState.types";

export default function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  iconName = "alert-circle-outline",
  onRetry,
  retryLabel = "Try Again",
  style,
  className,
}: ErrorStateProps) {
  return (
    <View
      style={style}
      className={cn(
        "flex-1 justify-center items-center p-6 text-center",
        className
      )}
    >
      <View className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-950/40 justify-center items-center mb-5 border border-red-100/50 dark:border-red-900/40">
        <AppIcon name={iconName} size={40} color={Colors.danger[500]} />
      </View>

      <AppText
        variant="h3"
        weight="700"
        className="text-gray-900 dark:text-gray-100 text-center"
      >
        {title}
      </AppText>

      {description && (
        <AppText
          variant="bodySmall"
          className="text-gray-500 dark:text-gray-400 text-center mt-2 mb-6 max-w-xs"
        >
          {description}
        </AppText>
      )}

      {onRetry && (
        <Button size="md" onPress={onRetry} className="px-6 self-center">
          {retryLabel}
        </Button>
      )}
    </View>
  );
}
