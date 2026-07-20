import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  lastPage: boolean;
  onPress: () => void;
};

export default function NextButton({ lastPage, onPress }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  return (
    <Animated.View style={[animatedStyle, { flex: 1, marginLeft: 16 }]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="h-14 rounded-2xl items-center justify-center bg-primary"
      >
        <Text className="text-white font-semibold text-lg">
          {lastPage ? "Get Started" : "Next"}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
