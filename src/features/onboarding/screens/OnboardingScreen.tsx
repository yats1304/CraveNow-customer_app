import { LinearGradient } from "expo-linear-gradient";
import { FlatList, View } from "react-native";
import BottomControls from "../components/BottomControls";
import OnboardingItem from "../components/OnboardingItem";
import { onboardingData } from "../data/onboarding.data";
import { useOnboarding } from "../hooks/useOnboarding";

export default function OnboardingScreen() {
  const { flatListRef, onMomentumScrollEnd, currentIndex, next, skip } =
    useOnboarding();

  return (
    <View className="flex-1 ">
      <LinearGradient
        colors={["#FFFFFF", "#FFF8F4", "#FFFFFF"]}
        className="flex-1"
      />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <OnboardingItem item={item} index={index} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={2}
        removeClippedSubviews
      />

      <BottomControls
        currentIndex={currentIndex}
        total={onboardingData.length}
        onNext={next}
        onSkip={skip}
      />
    </View>
  );
}
