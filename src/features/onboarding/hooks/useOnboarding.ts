import { appStorage } from "@/services/storage";
import { logger } from "@/utils";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { onboardingData } from "../data/onboarding.data";
import { OnboardingItemType } from "../types/onboarding.types";

export function useOnboarding() {
  const flatListRef = useRef<FlatList<OnboardingItemType>>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );

    logger.debug("Onboarding", `Scrolled to slide index: ${index}`);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const next = () => {
    if (currentIndex < onboardingData.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      logger.info("Onboarding", "Completed final onboarding slide, persisting and navigating to Welcome");
      appStorage.completeOnboarding();
      router.replace("/(auth)/welcome");
    }
  };

  const skip = () => {
    logger.info("Onboarding", "User skipped onboarding slides, persisting and navigating to Welcome");
    appStorage.completeOnboarding();
    router.replace("/(auth)/welcome");
  };

  return {
    flatListRef,
    currentIndex,
    scrollToIndex,
    onMomentumScrollEnd,
    next,
    skip,
  };
}
