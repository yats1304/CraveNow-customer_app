import { Restaurant } from "@/types";

export interface SearchResultsListProps {
  restaurants: Restaurant[];
  onRestaurantPress?: (restaurant: Restaurant) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  isLoadingMore?: boolean;
}
