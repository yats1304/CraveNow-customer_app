import AppText from "@/components/ui/Text/AppText";
import { Clock, Star } from "lucide-react-native";
import { memo } from "react";
import { Image, Pressable, View } from "react-native";
import { Restaurant } from "../types/home.types";

interface RestaurantSectionProps {
  restaurants?: Restaurant[];
}

const RestaurantSection = ({ restaurants = [] }: RestaurantSectionProps) => {
  if (!restaurants.length) return null;

  return (
    <View className="px-4 gap-y-4">
      {restaurants.map((restaurant) => (
        <Pressable
          key={restaurant._id}
          className="bg-white dark:bg-zinc-900 border border-neutral-200/60 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs active:opacity-85"
        >
          {/* Banner Image */}
          <View className="h-40 w-full bg-neutral-200 dark:bg-zinc-800">
            {restaurant.banner?.url ? (
              <Image
                source={{ uri: restaurant.banner.url }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : null}
          </View>

          {/* Info Container */}
          <View className="p-3">
            <View className="flex-row items-center justify-between">
              <AppText
                variant="body"
                weight="700"
                className="text-base text-neutral-900 dark:text-white flex-1 mr-2"
              >
                {restaurant.name}
              </AppText>
              <View className="flex-row items-center gap-x-1 px-2 py-0.5 rounded-lg bg-green-500/10">
                <Star size={14} color="#22C55E" fill="#22C55E" />
                <AppText
                  variant="caption"
                  weight="700"
                  className="text-green-600 dark:text-green-400"
                >
                  {restaurant.averageRating || "4.5"}
                </AppText>
              </View>
            </View>

            <View className="flex-row items-center gap-x-4 mt-2">
              <View className="flex-row items-center gap-x-1">
                <Clock size={14} color="#71717A" />
                <AppText variant="caption" color="muted">
                  {restaurant.averagePreparationTime} mins
                </AppText>
              </View>
              <AppText variant="caption" color="muted">
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
