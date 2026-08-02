import { Theme } from "@/components/theme";
import { ArrowLeft, Search, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Pressable, TextInput, View } from "react-native";
import { SearchHeaderProps } from "./types";

const SearchHeader = ({
  value,
  onChangeText,
  onBackPress,
  onClearPress,
  onSubmitEditing,
  placeholder = "Search food or restaurants...",
  autoFocus = true,
  editable = true,
}: SearchHeaderProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <Pressable
        onPress={onBackPress}
        hitSlop={10}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <ArrowLeft size={24} color={theme.textSecondary} />
      </Pressable>

      <View
        className="flex-1 flex-row items-center rounded-2xl px-4"
        style={{
          backgroundColor: theme.surface,
          borderWidth: 1,
          borderColor: theme.border,
        }}
      >
        <Search size={18} color={theme.iconDefault} />

        <TextInput
          className="flex-1 px-3 py-3 text-base"
          style={{ color: theme.textPrimary }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.textMuted}
          autoFocus={autoFocus}
          editable={editable}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="never"
          onSubmitEditing={onSubmitEditing}
          selectionColor={theme.brandPrimary}
        />

        {value.length > 0 && (
          <Pressable
            onPress={onClearPress}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <X size={18} color={theme.iconDefault} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default memo(SearchHeader);
