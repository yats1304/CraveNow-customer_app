import AppText from "@/components/ui/Text/AppText";
import { memo } from "react";
import { Pressable, View } from "react-native";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
  className?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  className = "",
}: SectionHeaderProps) => {
  return (
    <View className={`px-4 ${className}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <AppText
            variant="h3"
            weight="700"
            className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight"
          >
            {title}
          </AppText>

          {subtitle ? (
            <AppText
              variant="bodySmall"
              color="muted"
              className="mt-0.5 text-xs text-neutral-500 dark:text-zinc-400"
            >
              {subtitle}
            </AppText>
          ) : null}
        </View>

        {actionText && (
          <Pressable
            onPress={onActionPress}
            hitSlop={8}
            className="active:opacity-75"
          >
            <AppText
              variant="bodySmall"
              weight="700"
              className="text-sm font-semibold text-orange-500 dark:text-orange-400"
            >
              {actionText}
            </AppText>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default memo(SectionHeader);
