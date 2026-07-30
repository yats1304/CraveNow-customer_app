import { memo } from "react";
import { View } from "react-native";
import Skeleton from "./Skeleton";

export interface MenuItemSkeletonProps {
  className?: string;
}

const MenuItemSkeleton = ({ className = "" }: MenuItemSkeletonProps) => {
  return (
    <View className={`flex-row items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800/80 ${className}`}>
      {/* Left Info: Food Type, Name, Price, Description */}
      <View className="flex-1 mr-4 gap-y-2">
        {/* Tag & Name */}
        <View className="flex-row items-center gap-x-2">
          <Skeleton width={16} height={16} radius={4} />
          <Skeleton width="60%" height={18} radius={6} />
        </View>

        {/* Price */}
        <Skeleton width="30%" height={16} radius={6} />

        {/* Description Lines */}
        <Skeleton width="90%" height={12} radius={4} />
        <Skeleton width="65%" height={12} radius={4} />
      </View>

      {/* Right Side: Food Image & Add Button Placeholder */}
      <View className="items-center relative">
        <Skeleton width={96} height={96} radius={16} />
        <View className="absolute -bottom-3">
          <Skeleton width={72} height={28} radius={8} />
        </View>
      </View>
    </View>
  );
};

export default memo(MenuItemSkeleton);
