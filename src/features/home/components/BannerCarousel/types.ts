import { Banner } from "../../types/home.types";

export interface BannerCarouselProps {
  banners: Banner[];
  autoPlay?: boolean;
  loop?: boolean;
  onBannerPress?: (banner: Banner) => void;
}
