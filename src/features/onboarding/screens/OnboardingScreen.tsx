import { LinearGradient } from "expo-linear-gradient";
import { FlatList, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomControls from "../components/BottomControls";
import OnboardingItem from "../components/OnboardingItem";
import { onboardingData } from "../data/onboarding.data";
import { useOnboarding } from "../hooks/useOnboarding";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const { flatListRef, onMomentumScrollEnd, currentIndex, next, skip } =
    useOnboarding();

  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    flatListRef.current?.scrollToOffset({
      offset: info.index * width,
      animated: true,
    });
  };

  return (
    <View className="flex-1">
      <LinearGradient
        colors={["#FFFFFF", "#FFF8F4", "#FFFFFF"]}
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
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
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
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
      </SafeAreaView>
    </View>
  );
}
