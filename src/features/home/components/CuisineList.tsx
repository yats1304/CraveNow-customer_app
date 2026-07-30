import AppText from "@/components/ui/Text/AppText";
import { memo } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Cuisine } from "../types/home.types";

interface CuisineListProps {
  cuisines?: Cuisine[];
}

const CuisineList = ({ cuisines = [] }: CuisineListProps) => {
  if (!cuisines.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View className="flex-row items-center gap-x-4">
        {cuisines.map((cuisine) => (
          <Pressable
            key={cuisine._id}
            className="flex-col items-center gap-y-1.5 active:opacity-70"
          >
            <View className="w-16 h-16 rounded-full overflow-hidden bg-neutral-200 dark:bg-zinc-800 border border-neutral-200/60 dark:border-zinc-700/60 items-center justify-center">
              {cuisine.image?.url ? (
                <Image
                  source={{ uri: cuisine.image.url }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-orange-100 dark:bg-orange-950/40" />
              )}
            </View>
            <AppText
              variant="caption"
              weight="600"
              className="text-xs text-neutral-800 dark:text-zinc-200"
            >
              {cuisine.name}
            </AppText>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(CuisineList);
