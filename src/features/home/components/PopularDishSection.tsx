import AppText from "@/components/ui/Text/AppText";
import { memo } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { FeaturedMenuItem } from "../types/home.types";

interface PopularDishSectionProps {
  items?: FeaturedMenuItem[];
}

const PopularDishSection = ({ items = [] }: PopularDishSectionProps) => {
  if (!items.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View className="flex-row items-center gap-x-4">
        {items.map((item) => (
          <Pressable
            key={item._id}
            className="w-44 bg-white dark:bg-zinc-900 border border-neutral-200/60 dark:border-zinc-800 rounded-2xl overflow-hidden p-2.5 shadow-xs active:opacity-85"
          >
            <View className="w-full h-32 rounded-xl overflow-hidden bg-neutral-100 dark:bg-zinc-800 mb-2">
              {item.images?.[0]?.url ? (
                <Image
                  source={{ uri: item.images[0].url }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : null}
            </View>

            <AppText
              variant="bodySmall"
              weight="700"
              numberOfLines={1}
              className="text-neutral-900 dark:text-white"
            >
              {item.name}
            </AppText>

            <View className="flex-row items-center justify-between mt-2">
              <AppText
                variant="body"
                weight="700"
                className="text-orange-600 dark:text-orange-500"
              >
                ₹{item.price}
              </AppText>
              <View className="px-2.5 py-1 rounded-lg bg-orange-500">
                <AppText
                  variant="caption"
                  weight="700"
                  className="text-white text-xs"
                >
                  ADD
                </AppText>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(PopularDishSection);
