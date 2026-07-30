import { memo } from "react";
import { Image, Pressable, View } from "react-native";
import { Banner } from "../../types/home.types";

export interface BannerItemProps {
  item: Banner;
  onPress?: (banner: Banner) => void;
  width?: number;
  height?: number;
}

const BannerItem = ({
  item,
  onPress,
  width,
  height = 176,
}: BannerItemProps) => {
  return (
    <Pressable
      onPress={() => onPress?.(item)}
      style={width ? { width, height } : { height }}
      className="w-full rounded-2xl overflow-hidden bg-neutral-200 dark:bg-zinc-800 border border-neutral-200/50 dark:border-zinc-700/50 active:opacity-90 shadow-xs"
    >
      {item.image?.url ? (
        <Image
          source={{ uri: item.image.url }}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <View className="w-full h-full bg-neutral-300 dark:bg-zinc-700 items-center justify-center" />
      )}
    </Pressable>
  );
};

export default memo(BannerItem);
