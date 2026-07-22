import { Button } from "@/components/ui/Button";
import { View } from "react-native";
import Pagination from "./Pagination";

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
        {!isLastPage && (
          <Button
            variant="secondary"
            size="lg"
            onPress={onSkip}
            className="w-28"
          >
            Skip
          </Button>
        )}

        <Button
          variant="primary"
          size="lg"
          onPress={onNext}
          className="flex-1 ml-4"
        >
          {isLastPage ? "Get Started" : "Next"}
        </Button>
      </View>
    </View>
  );
}
