import { ActivityIndicator, Pressable, View } from "react-native";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { AppIcon } from "../AppIcon";
import BaseInput from "../Input/BaseInput";
import { SearchBarProps } from "./SearchBar.types";

export default function SearchBar({
  value,
  onChangeText,
  loading = false,
  onClear,
  containerStyle,
  className,
  placeholder = "Search...",
  ...props
}: SearchBarProps) {
  const handleClear = () => {
    onChangeText("");
    onClear?.();
  };

  // Determine right-hand side accessory icon (loading spinner vs clear action)
  const rightIcon = loading ? (
    <ActivityIndicator size="small" color={Colors.primary[500]} />
  ) : value ? (
    <Pressable
      onPress={handleClear}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Clear search text"
    >
      <AppIcon name="close-circle-outline" size={20} color={Colors.gray[400]} />
    </Pressable>
  ) : undefined;

  return (
    <View style={containerStyle} className={cn("w-full mb-4", className)}>
      <BaseInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        leftIcon={
          <AppIcon name="search-outline" size={20} color={Colors.gray[400]} />
        }
        rightIcon={rightIcon}
        {...props}
      />
    </View>
  );
}
