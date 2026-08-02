import { Theme } from "@/components/theme";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { View } from "react-native";
import Skeleton from "./Skeleton";

export interface RestaurantCardSkeletonProps {
  className?: string;
}

const RestaurantCardSkeleton = ({
  className = "",
}: RestaurantCardSkeletonProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  return (
    <View
      className={`rounded-2xl p-3 mb-4 ${className}`}
      style={{
        backgroundColor: theme.surface,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      {/* Restaurant Cover Image */}
      <Skeleton width="100%" height={160} radius={16} />

      {/* Info Content */}
      <View className="mt-3 gap-y-2">
        {/* Restaurant Name & Rating Badge */}
        <View className="flex-row items-center justify-between">
          <Skeleton width="65%" height={20} radius={8} />
          <Skeleton width={48} height={20} radius={8} />
        </View>

        {/* Cuisine Types */}
        <Skeleton width="45%" height={14} radius={6} />

        {/* Delivery Time, Distance & Price */}
        <View className="flex-row items-center justify-between pt-1">
          <View className="flex-row items-center gap-x-2">
            <Skeleton width={70} height={16} radius={6} />
            <Skeleton width={50} height={16} radius={6} />
          </View>
          <Skeleton width={60} height={16} radius={6} />
        </View>
      </View>
    </View>
  );
};

export default memo(RestaurantCardSkeleton);
