import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type Props = {
  total: number;
  currentIndex: number;
};

function Dot({ active }: { active: boolean }) {
  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(active ? 26 : 8, {
      duration: 250,
    }),
    opacity: withTiming(active ? 1 : 0.4),
  }));

  return (
    <Animated.View
      style={animatedStyle}
      className="h-2 rounded-full bg-primary"
    />
  );
}

export default function Pagination({ total, currentIndex }: Props) {
  return (
    <View className="flex-row justify-center gap-2">
      {Array.from({ length: total }).map((_, index) => (
        <Dot key={index} active={index === currentIndex} />
      ))}
    </View>
  );
}
