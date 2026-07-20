import { View } from "react-native";
import NextButton from "./NextButton";
import Pagination from "./Pagination";
import SkipButton from "./SkipButton";

type Props = {
  currentIndex: number;
  total: number;
  onNext: () => void;
  onSkip: () => void;
};

export default function BottomControls({
  currentIndex,
  total,
  onNext,
  onSkip,
}: Props) {
  const isLastPage = currentIndex === total - 1;

  return (
    <View className="px-6 pb-10">
      <Pagination total={total} currentIndex={currentIndex} />

      <View className="flex-row mt-8">
        {!isLastPage && <SkipButton onPress={onSkip} />}

        <NextButton lastPage={isLastPage} onPress={onNext} />
      </View>
    </View>
  );
}
