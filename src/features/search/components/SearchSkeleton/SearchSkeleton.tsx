import { memo } from "react";
import { FlatList } from "react-native";

import { RestaurantCardSkeleton } from "@/components/Skeleton";

const SKELETON_DATA = Array.from({ length: 5 }, (_, index) => ({
  id: index.toString(),
}));

const SearchSkeleton = () => {
  return (
    <FlatList
      data={SKELETON_DATA}
      keyExtractor={(item) => item.id}
      renderItem={() => <RestaurantCardSkeleton />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 120,
      }}
    />
  );
};

export default memo(SearchSkeleton);
