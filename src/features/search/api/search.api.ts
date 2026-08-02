import { apiClient, SEARCH_ENDPOINT } from "@/services/api";
import { SearchRestaurantParams, SearchRestaurantResponse } from "@/types";

export const searchRestaurants = (params: SearchRestaurantParams) => {
  return apiClient.get<SearchRestaurantResponse>(SEARCH_ENDPOINT.SEARCH, {
    params,
  });
};
