import { memo } from "react";
import { ScrollView, View } from "react-native";
import Skeleton from "./Skeleton";

export interface CategorySkeletonProps {
  count?: number;
  circleSize?: number;
  className?: string;
}

const CategorySkeleton = ({
  count = 6,
  circleSize = 64,
  className = "",
}: CategorySkeletonProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={`py-3 ${className}`}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <View className="flex-row items-center gap-x-4">
        {Array.from({ length: count }).map((_, index) => (
          <View key={index} className="flex-col items-center gap-y-2">
            <Skeleton width={circleSize} height={circleSize} radius={circleSize / 2} />
            <Skeleton width={50} height={12} radius={6} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default memo(CategorySkeleton);
