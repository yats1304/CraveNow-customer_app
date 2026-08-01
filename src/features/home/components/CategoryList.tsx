import { Theme } from "@/components/theme";
import AppText from "@/components/ui/Text/AppText";
import { useColorScheme } from "nativewind";
import { memo, useState } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Category } from "../types/home.types";

interface CategoryListProps {
  categories?: Category[];
  onSelect?: (id: string) => void;
}

const CategoryList = ({ categories = [], onSelect }: CategoryListProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!categories.length) return null;

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
      <View className="flex-row items-center gap-x-3">
        {categories.map((category) => {
          const isSelected = selectedId === category._id;

          return (
            <Pressable
              key={category._id}
              onPress={() => handlePress(category._id)}
              className="flex-row items-center gap-x-2 px-3.5 py-2 rounded-xl active:opacity-70"
              style={{
                backgroundColor: isSelected
                  ? theme.brandPrimary
                  : theme.surface,
                borderWidth: 1,
                borderColor: isSelected ? theme.brandPrimary : theme.border,
              }}
            >
              {category.image?.url && (
                <Image
                  source={{ uri: category.image.url }}
                  className="w-6 h-6 rounded-md"
                  resizeMode="cover"
                  style={{
                    opacity: isSelected ? 0.9 : 1,
                  }}
                />
              )}
              <AppText
                variant="bodySmall"
                weight="600"
                style={{
                  color: isSelected ? theme.iconOnBrand : theme.textPrimary,
                }}
              >
                {category.name}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default memo(CategoryList);
