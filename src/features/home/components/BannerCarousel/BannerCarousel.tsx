import { memo, useState } from "react";
import { Dimensions, View } from "react-native";
import { Carousel } from "react-native-reanimated-carousel";
import { Banner } from "../../types/home.types";
import BannerItem from "./BannerItem";
import Pagination from "./Pagination";
import { BannerCarouselProps } from "./types";

const { width: screenWidth } = Dimensions.get("window");
const carouselWidth = screenWidth - 32;

const BannerCarousel = ({
  banners = [],
  autoPlay = true,
  loop = true,
  onBannerPress,
}: BannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!banners.length) return null;

  return (
    <View className="my-3 px-4 items-center">
      <Carousel<Banner>
        loop={loop}
        style={{ width: carouselWidth, height: 176 }}
        autoplay={autoPlay}
        autoplayInterval={3500}
        data={banners}
        onSnapToItem={(index: number) => setCurrentIndex(index)}
        renderItem={({ item }: { item: Banner }) => (
          <BannerItem item={item} onPress={onBannerPress} height={176} />
        )}
      />
      <Pagination total={banners.length} currentIndex={currentIndex} />
    </View>
  );
};

export default memo(BannerCarousel);
