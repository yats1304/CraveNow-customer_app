import { Clock3, Star } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Theme } from "@/components/theme";
import { RestaurantCardProps } from "./types";

const RestaurantCard = ({ restaurant, onPress }: RestaurantCardProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  const bannerUri =
    typeof restaurant.banner === "string"
      ? restaurant.banner
      : restaurant.banner?.url;

  const rating = restaurant.averageRating ?? 0;
  const prepTime = restaurant.averagePreparationTime;

  return (
    <Pressable
      onPress={() => onPress?.(restaurant)}
      className="mb-4 overflow-hidden rounded-2xl"
      style={{
        backgroundColor: theme.surface,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      <View
        className="h-44 w-full"
        style={{ backgroundColor: theme.brandSubtle }}
      >
        {bannerUri ? (
          <Image
            source={{ uri: bannerUri }}
            className="h-44 w-full"
            resizeMode="cover"
          />
        ) : null}
      </View>

      <View className="p-4">
        <Text
          className="text-lg font-semibold"
          style={{ color: theme.textPrimary }}
        >
          {restaurant.name}
        </Text>

        {restaurant.description ? (
          <Text
            className="mt-1"
            numberOfLines={2}
            style={{ color: theme.textSecondary }}
          >
            {restaurant.description}
          </Text>
        ) : null}

        <View className="mt-3 flex-row items-center">
          <Star size={16} color={theme.warning} fill={theme.warning} />

          <Text className="ml-1" style={{ color: theme.textPrimary }}>
            {rating.toFixed(1)}
          </Text>

          <Clock3
            size={16}
            color={theme.iconDefault}
            style={{ marginLeft: 16 }}
          />

          <Text className="ml-1" style={{ color: theme.textSecondary }}>
            {prepTime != null ? `${prepTime} min` : "—"}
          </Text>
        </View>

        {restaurant.cuisines?.length ? (
          <Text className="mt-3" style={{ color: theme.textSecondary }}>
            {restaurant.cuisines.map((c) => c.name).join(" • ")}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
};

export default memo(RestaurantCard);
