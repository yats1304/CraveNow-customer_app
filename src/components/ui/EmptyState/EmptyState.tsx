import { View } from "react-native";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { AppText } from "../Text";
import { AppIcon } from "../AppIcon";
import { Button } from "../Button";
import { EmptyStateProps } from "./EmptyState.types";

export default function EmptyState({
  title,
  description,
  iconName = "document-text-outline",
  actionLabel,
  onAction,
  style,
  className,
}: EmptyStateProps) {
  return (
    <View
      style={style}
      className={cn(
        "flex-1 justify-center items-center p-6 text-center",
        className
      )}
    >
      <View className="w-20 h-20 rounded-full bg-gray-50 dark:bg-neutral-800 justify-center items-center mb-5 border border-gray-100/50 dark:border-neutral-700/50">
        <AppIcon name={iconName} size={40} color={Colors.gray[400]} />
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

      {actionLabel && onAction && (
        <Button size="md" onPress={onAction} className="px-6 self-center">
          {actionLabel}
        </Button>
      )}
    </View>
  );
}
