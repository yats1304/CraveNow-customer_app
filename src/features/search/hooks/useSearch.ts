import { SearchRestaurantParams } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/search.service";

export const useSearch = (params: SearchRestaurantParams) => {
  return useQuery({
    queryKey: ["restaurant-search", params],
    queryFn: () => searchService.getSearchRestaurants(params),
    enabled: !!params.search?.trim(),
    staleTime: 1000 * 60 * 5,
  });
};
