import { appStorage } from "@/services/storage";
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
      appStorage.completeOnboarding();
      router.replace("/(auth)/login");
    }
  };

  const skip = () => {
    appStorage.completeOnboarding();
    router.replace("/(auth)/login");
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
