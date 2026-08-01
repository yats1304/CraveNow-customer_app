import { Theme } from "@/components/theme";
import AppText from "@/components/ui/Text/AppText";
import { Clock, Star } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Image, Pressable, View } from "react-native";
import { Restaurant } from "../types/home.types";

interface RestaurantSectionProps {
  restaurants?: Restaurant[];
  onPress?: (restaurant: Restaurant) => void;
}

const RestaurantSection = ({
  restaurants = [],
  onPress,
}: RestaurantSectionProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  if (!restaurants.length) return null;

  return (
    <View className="px-4 gap-y-4">
      {restaurants.map((restaurant) => (
        <Pressable
          key={restaurant._id}
          onPress={() => onPress?.(restaurant)}
          className="rounded-2xl overflow-hidden active:opacity-85"
          style={{
            backgroundColor: theme.surface,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <View
            className="h-40 w-full"
            style={{ backgroundColor: theme.brandSubtle }}
          >
            {restaurant.banner?.url ? (
              <Image
                source={{ uri: restaurant.banner.url }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : null}
          </View>

          <View className="p-3">
            <View className="flex-row items-center justify-between">
              <AppText
                variant="body"
                weight="700"
                className="text-base flex-1 mr-2"
                style={{ color: theme.textPrimary }}
              >
                {restaurant.name}
              </AppText>

              <View
                className="flex-row items-center gap-x-1 px-2 py-0.5 rounded-lg"
                style={{ backgroundColor: theme.successBg }}
              >
                <Star size={14} color={theme.success} fill={theme.success} />
                <AppText
                  variant="caption"
                  weight="700"
                  style={{ color: theme.success }}
                >
                  {restaurant.averageRating || "4.5"}
                </AppText>
              </View>
            </View>

            <View className="flex-row items-center gap-x-4 mt-2">
              <View className="flex-row items-center gap-x-1">
                <Clock size={14} color={theme.iconDefault} />
                <AppText
                  variant="caption"
                  style={{ color: theme.textSecondary }}
                >
                  {restaurant.averagePreparationTime} mins
                </AppText>
              </View>

              <AppText variant="caption" style={{ color: theme.textSecondary }}>
                Min ₹{restaurant.minimumOrderAmount}
              </AppText>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default memo(RestaurantSection);
