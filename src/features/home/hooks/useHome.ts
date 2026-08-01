import { useQuery } from "@tanstack/react-query";
import { homeService } from "../services";

export const useHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: () => homeService.getHomeData(),
    staleTime: 1000 * 60 * 5,
  });
};
