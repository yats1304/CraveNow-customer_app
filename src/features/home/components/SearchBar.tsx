import { Colors } from "@/components/theme";
import AppText from "@/components/ui/Text/AppText";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { SearchBarProps } from "../types/home.types";

const SearchBar = ({
  placeholder = "Search for food, restaurants...",
  onPress,
}: SearchBarProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const iconColor = isDark ? "#A1A1AA" : "#71717A";
  const primaryColor = Colors?.primary?.[500] || "#E44A25";

  return (
    <View className="px-4 py-1.5">
      <Pressable
        onPress={onPress}
        className="flex-row items-center justify-between bg-neutral-100 dark:bg-zinc-800/80 border border-neutral-200/80 dark:border-zinc-700/60 rounded-2xl px-4 py-3 shadow-xs active:opacity-85"
        hitSlop={4}
      >
        <View className="flex-row items-center flex-1 mr-2 gap-x-3">
          <Search size={20} color={iconColor} />

          <AppText
            variant="body"
            color="muted"
            numberOfLines={1}
            className="text-sm font-normal text-neutral-400 dark:text-zinc-400 flex-1"
          >
            {placeholder}
          </AppText>
        </View>

        {/* Filter Action Icon */}
        <View className="pl-3 border-l border-neutral-200 dark:border-zinc-700/80">
          <SlidersHorizontal size={18} color={primaryColor} />
        </View>
      </Pressable>
    </View>
  );
};

export default memo(SearchBar);
