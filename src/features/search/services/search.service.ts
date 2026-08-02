import { logger } from "@/utils";

import { SearchRestaurantParams, SearchRestaurantResponse } from "@/types";
import { searchRestaurants } from "../api/search.api";

export const searchService = {
  async getSearchRestaurants(
    params: SearchRestaurantParams,
  ): Promise<SearchRestaurantResponse> {
    logger.info("SearchService", "Fetching restaurants");

    try {
      const response = await searchRestaurants(params);

      return response.data;
    } catch (error) {
      logger.error("SearchService", "Failed to fetch restaurants", error);

      throw error;
    }
  },
};
