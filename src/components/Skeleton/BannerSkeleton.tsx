import { memo } from "react";
import { View } from "react-native";
import Skeleton from "./Skeleton";

export interface BannerSkeletonProps {
  height?: number;
  radius?: number;
  className?: string;
}

const BannerSkeleton = ({
  height = 180,
  radius = 20,
  className = "",
}: BannerSkeletonProps) => {
  return (
    <View className={`px-4 my-2 ${className}`}>
      <Skeleton width="100%" height={height} radius={radius} />
    </View>
  );
};

export default memo(BannerSkeleton);
