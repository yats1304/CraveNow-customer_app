import { logger } from "@/utils";
import { homeApi } from "../api/home.api";
import { HomeData } from "../types/home.types";

export const homeService = {
  async getHomeData(): Promise<HomeData> {
    logger.info("HomeService", "Fetching home dashboard data");
    try {
      const response = await homeApi.getHomeData();
      logger.info("HomeService", "Home data fetched successfully", {
        bannersCount: response.data.data?.banners?.data?.length || 0,
        cuisinesCount: response.data.data?.cuisines?.data?.length || 0,
        restaurantsCount: response.data.data?.featuredRestaurants?.data?.length || 0,
      });
      return response.data.data;
    } catch (error) {
      logger.error("HomeService", "Failed to fetch home data", error);
      throw error;
    }
  },
};
