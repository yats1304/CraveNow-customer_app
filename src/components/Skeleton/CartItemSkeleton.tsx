import { memo } from "react";
import { View } from "react-native";
import Skeleton from "./Skeleton";

export interface CartItemSkeletonProps {
  className?: string;
}

const CartItemSkeleton = ({ className = "" }: CartItemSkeletonProps) => {
  return (
    <View className={`flex-row items-center justify-between p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-xl mb-3 ${className}`}>
      {/* Food Thumbnail */}
      <Skeleton width={64} height={64} radius={12} />

      {/* Item Name & Unit Price */}
      <View className="flex-1 mx-3 gap-y-1.5">
        <Skeleton width="70%" height={16} radius={6} />
        <Skeleton width="40%" height={14} radius={6} />
      </View>

      {/* Stepper Controls & Subtotal */}
      <View className="items-end gap-y-2">
        <Skeleton width={80} height={28} radius={8} />
        <Skeleton width={50} height={14} radius={4} />
      </View>
    </View>
  );
};

export default memo(CartItemSkeleton);
