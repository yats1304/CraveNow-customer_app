import { AppText } from "@/components/ui/Text";
import { OnboardingItemType } from "@/features/onboarding";
import { Image } from "expo-image";
import { Dimensions, View } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedAppText = Animated.createAnimatedComponent(AppText);

type Props = {
  item: OnboardingItemType;
  index: number;
};

export default function OnboardingItem({ item, index }: Props) {
  const { width } = Dimensions.get("window");
  return (
    <View style={{ width }} className="flex items-center justify-center px-8">
      <AnimatedImage
        key={`image-${index}`}
        entering={FadeIn.duration(600)}
        source={item.image}
        contentFit="contain"
        style={{ width: 380, height: 380 }}
      />

      <AnimatedAppText
        key={`title-${index}`}
        entering={FadeInUp.delay(200)}
        variant="h1"
        weight="700"
        align="center"
        className="mt-8 text-gray-900 dark:text-gray-100"
      >
        {item.title}
      </AnimatedAppText>

      <AnimatedAppText
        key={`desc-${index}`}
        entering={FadeInUp.delay(350)}
        variant="body"
        align="center"
        className="text-gray-500 dark:text-gray-400 mt-4 leading-6"
      >
        {item.description}
      </AnimatedAppText>
    </View>
  );
}
