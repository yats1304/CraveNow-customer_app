import { Theme } from "@/components/theme";
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
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  return (
    <View className="px-4 py-1.5">
      <Pressable
        onPress={onPress}
        className="flex-row items-center justify-between rounded-2xl px-4 py-3 active:opacity-85"
        style={{
          backgroundColor: theme.surface,
          borderWidth: 1,
          borderColor: theme.border,
        }}
        hitSlop={4}
      >
        <View className="flex-row items-center flex-1 mr-2 gap-x-3">
          <Search size={20} color={theme.iconDefault} />

          <AppText
            variant="body"
            color="muted"
            numberOfLines={1}
            className="text-sm font-normal flex-1"
            style={{ color: theme.textMuted }}
          >
            {placeholder}
          </AppText>
        </View>

        <View
          className="pl-3"
          style={{ borderLeftWidth: 1, borderLeftColor: theme.border }}
        >
          <SlidersHorizontal size={18} color={theme.brandPrimary} />
        </View>
      </Pressable>
    </View>
  );
};

export default memo(SearchBar);
