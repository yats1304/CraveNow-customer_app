import { apiClient, HOME_ENDPOINTS } from "@/services/api";
import { HomeResponse } from "../types/home.types";

export const homeApi = {
  getHomeData() {
    return apiClient.get<HomeResponse>(HOME_ENDPOINTS.HOME);
  },
};

export const getHomeData = () => homeApi.getHomeData();
