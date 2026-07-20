import { Pressable, Text } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Props = {
  onPress: () => void;
};

export default function SkipButton({ onPress }: Props) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Pressable
        onPress={onPress}
        className="h-14 w-28 rounded-2xl items-center justify-center bg-gray-100"
      >
        <Text className="font-semibold text-primary">Skip</Text>
      </Pressable>
    </Animated.View>
  );
}
