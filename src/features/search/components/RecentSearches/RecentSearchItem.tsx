import { Clock3, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";

import { Theme } from "@/components/theme";
import { RecentSearchItemProps } from "./types";

const RecentSearchItem = ({
  search,
  onPress,
  onRemovePress,
}: RecentSearchItemProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  return (
    <Pressable
      onPress={() => onPress(search.keyword)}
      className="flex-row items-center justify-between py-4"
    >
      <View className="flex-1 flex-row items-center">
        <Clock3 size={18} color={theme.textSecondary} />

        <Text
          className="ml-3 flex-1 text-base"
          style={{ color: theme.textPrimary }}
          numberOfLines={1}
        >
          {search.keyword}
        </Text>
      </View>

      <Pressable hitSlop={10} onPress={() => onRemovePress(search.keyword)}>
        <X size={18} color={theme.textSecondary} />
      </Pressable>
    </Pressable>
  );
};

export default memo(RecentSearchItem);
