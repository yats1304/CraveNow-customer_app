import { Theme } from "@/components/theme";
import AppText from "@/components/ui/Text/AppText";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { FeaturedMenuItem } from "../types/home.types";

interface PopularDishSectionProps {
  items?: FeaturedMenuItem[];
  onAdd?: (item: FeaturedMenuItem) => void;
  onPress?: (item: FeaturedMenuItem) => void;
}

const PopularDishSection = ({
  items = [],
  onAdd,
  onPress,
}: PopularDishSectionProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

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
            onPress={() => onPress?.(item)}
            className="w-44 rounded-2xl overflow-hidden p-2.5 active:opacity-85"
            style={{
              backgroundColor: theme.surface,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <View
              className="w-full h-32 rounded-xl overflow-hidden mb-2"
              style={{ backgroundColor: theme.brandSubtle }}
            >
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
              style={{ color: theme.textPrimary }}
            >
              {item.name}
            </AppText>

            <View className="flex-row items-center justify-between mt-2">
              <AppText
                variant="body"
                weight="700"
                style={{ color: theme.textPrimary }}
              >
                ₹{item.price}
              </AppText>

              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  onAdd?.(item);
                }}
                className="px-2.5 py-1 rounded-lg active:opacity-75"
                style={{ backgroundColor: theme.brandPrimary }}
                hitSlop={6}
              >
                <AppText
                  variant="caption"
                  weight="700"
                  style={{
                    color: theme.iconOnBrand,
                    fontSize: 12,
                  }}
                >
                  ADD
                </AppText>
              </Pressable>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(PopularDishSection);
