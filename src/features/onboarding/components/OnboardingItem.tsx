import { OnboardingItemType } from "@/features/onboarding";
import { Image } from "expo-image";
import { Dimensions, View } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

type Props = {
  item: OnboardingItemType;
  index: number;
};

export default function OnboardingItem({ item, index }: Props) {
  const { width } = Dimensions.get("window");
  return (
    <View style={{ width }} className="flex items-center justify-center px-8">
      <AnimatedImage
        entering={FadeIn.duration(600)}
        source={item.image}
        contentFit="contain"
        style={{ width: 380, height: 380 }}
      />

      <Animated.Text
        key={`title-${index}`}
        entering={FadeInUp.delay(200)}
        className="text-4xl font-bold text-center mt-8"
      >
        {item.title}
      </Animated.Text>

      <Animated.Text
        key={`desc-${index}`}
        entering={FadeInUp.delay(350)}
        className="text-lg text-gray-500 text-center mt-4"
      >
        {item.description}
      </Animated.Text>
    </View>
  );
}
