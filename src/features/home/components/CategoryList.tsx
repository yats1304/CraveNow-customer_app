import { memo } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import AppText from "@/components/ui/Text/AppText";
import { Category } from "../types/home.types";

interface CategoryListProps {
  categories?: Category[];
}

const CategoryList = ({ categories = [] }: CategoryListProps) => {
  if (!categories.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View className="flex-row items-center gap-x-3">
        {categories.map((category) => (
          <Pressable
            key={category._id}
            className="flex-row items-center gap-x-2 px-3.5 py-2 bg-white dark:bg-zinc-800/90 border border-neutral-200/80 dark:border-zinc-700/80 rounded-xl shadow-xs active:opacity-70"
          >
            {category.image?.url && (
              <Image source={{ uri: category.image.url }} className="w-6 h-6 rounded-md" resizeMode="cover" />
            )}
            <AppText variant="bodySmall" weight="600" className="text-neutral-800 dark:text-zinc-200">
              {category.name}
            </AppText>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(CategoryList);
