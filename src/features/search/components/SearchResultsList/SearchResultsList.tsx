import { Restaurant } from "@/types";
import { memo } from "react";
import { FlatList } from "react-native";
import RestaurantCard from "../RestaurantCard";
import { SearchResultsListProps } from "./types";

const SearchResultsList = ({
  restaurants,
  onRestaurantPress,
  refreshing = false,
  onRefresh,
  onEndReached,
}: SearchResultsListProps) => {
  const renderItem = ({ item }: { item: Restaurant }) => (
    <RestaurantCard restaurant={item} onPress={onRestaurantPress} />
  );

  return (
    <FlatList
      data={restaurants}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 120,
      }}
    />
  );
};

export default memo(SearchResultsList);
