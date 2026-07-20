import {
  SPLASH,
  SplashBackground,
  SplashLogo,
  useSplash,
} from "@/features/splash";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function SplashScreen() {
  useSplash();

  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);

  const textTranslateY = useSharedValue(20);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withTiming(1, { duration: 1000 });
    logoOpacity.value = withTiming(1, { duration: 1000 }, () => {
      logoScale.value = withRepeat(
        withSequence(
          withTiming(1.04, { duration: 1500 }),
          withTiming(1, { duration: 1500 }),
        ),
        -1,
        true,
      );
    });

    textTranslateY.value = withDelay(500, withTiming(0, { duration: 800 }));
    textOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: textTranslateY.value }],
    opacity: textOpacity.value,
  }));

  return (
    <SplashBackground>
      <View className="items-center">
        <Animated.View style={logoAnimatedStyle}>
          <SplashLogo />
        </Animated.View>

        <Animated.View style={textAnimatedStyle}>
          <Text className="text-muted text-lg mt-4 font-medium tracking-wide">
            {SPLASH.TAGLINE}
          </Text>
        </Animated.View>
      </View>
    </SplashBackground>
  );
}
