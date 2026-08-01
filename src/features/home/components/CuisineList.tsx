import { Theme } from "@/components/theme";
import AppText from "@/components/ui/Text/AppText";
import { useColorScheme } from "nativewind";
import { memo, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Cuisine } from "../types/home.types";

interface CuisineListProps {
  cuisines?: Cuisine[];
  onSelect?: (id: string) => void;
}

const CuisineList = ({ cuisines = [], onSelect }: CuisineListProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!cuisines.length) return null;

  const handlePress = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
    onSelect?.(id);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View className="flex-row items-center gap-x-4">
        {cuisines.map((cuisine) => {
          const isSelected = selectedId === cuisine._id;

          return (
            <Pressable
              key={cuisine._id}
              onPress={() => handlePress(cuisine._id)}
              className="flex-col items-center gap-y-1.5 active:opacity-70"
            >
              <View
                className="w-16 h-16 rounded-full overflow-hidden items-center justify-center"
                style={{
                  borderWidth: isSelected ? 2 : 1,
                  borderColor: isSelected ? theme.brandPrimary : theme.border,
                  backgroundColor: theme.surface,
                }}
              >
                {cuisine.image?.url ? (
                  <Image
                    source={{ uri: cuisine.image.url }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    className="w-full h-full"
                    style={{ backgroundColor: theme.brandSubtle }}
                  />
                )}
              </View>

              <AppText
                variant="caption"
                weight={isSelected ? "700" : "600"}
                style={{
                  color: isSelected ? theme.brandPrimary : theme.textPrimary,
                  fontSize: 12,
                }}
              >
                {cuisine.name}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default memo(CuisineList);
