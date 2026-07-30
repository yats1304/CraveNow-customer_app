import { memo } from "react";
import { View } from "react-native";

export interface PaginationProps {
  total: number;
  currentIndex: number;
}

const Pagination = ({ total, currentIndex }: PaginationProps) => {
  if (total <= 1) return null;

  return (
    <View className="flex-row items-center justify-center gap-x-1.5 mt-3">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;
        return (
          <View
            key={index}
            className={`h-2 rounded-full ${
              isActive
                ? "w-6 bg-orange-500"
                : "w-2 bg-neutral-300 dark:bg-zinc-700"
            }`}
          />
        );
      })}
    </View>
  );
};

export default memo(Pagination);
