import { Theme } from "@/components/theme";
import { SearchX } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Text, View } from "react-native";

const SearchEmpty = () => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  return (
    <View className="flex-1 items-center justify-center px-8">
      <SearchX size={72} color={theme.textSecondary} />

      <Text
        className="mt-6 text-xl font-semibold"
        style={{ color: theme.textPrimary }}
      >
        No restaurants found
      </Text>

      <Text className="mt-2 text-center" style={{ color: theme.textSecondary }}>
        Try searching with another keyword or restaurant.
      </Text>
    </View>
  );
};

export default memo(SearchEmpty);
