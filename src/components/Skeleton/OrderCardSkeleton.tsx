import { memo } from "react";
import { View } from "react-native";
import Skeleton from "./Skeleton";

export interface OrderCardSkeletonProps {
  className?: string;
}

const OrderCardSkeleton = ({ className = "" }: OrderCardSkeletonProps) => {
  return (
    <View className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800/80 rounded-2xl p-4 mb-4 shadow-xs ${className}`}>
      {/* Top Header: Restaurant Logo, Name, Order Date, Status Badge */}
      <View className="flex-row items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center gap-x-3 flex-1 mr-2">
          <Skeleton width={44} height={44} radius={10} />
          <View className="flex-1 gap-y-1.5">
            <Skeleton width="75%" height={16} radius={6} />
            <Skeleton width="45%" height={12} radius={4} />
          </View>
        </View>

        {/* Status Badge */}
        <Skeleton width={76} height={24} radius={12} />
      </View>

      {/* Middle Item Summary */}
      <View className="py-3 gap-y-1.5">
        <Skeleton width="85%" height={14} radius={4} />
        <Skeleton width="60%" height={14} radius={4} />
      </View>

      {/* Bottom Footer: Total Price & Reorder Action Button */}
      <View className="flex-row items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
        <View className="flex-row items-center gap-x-1.5">
          <Skeleton width={40} height={14} radius={4} />
          <Skeleton width={60} height={18} radius={6} />
        </View>

        <Skeleton width={90} height={32} radius={8} />
      </View>
    </View>
  );
};

export default memo(OrderCardSkeleton);
