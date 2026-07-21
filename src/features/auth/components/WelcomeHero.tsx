import { Image, View } from "react-native";

import { Colors } from "@/components/theme";
import { AppText } from "@/components/ui";

export function WelcomeHero() {
  return (
    <View className="items-center">
      <Image
        source={require("@/assets/images/splash/cravenow-splash.png")}
        resizeMode="contain"
        className="h-80 w-80"
      />

      <AppText variant="h2" align="center" className="mt-8">
        Delicious Food, Delivered Fast
      </AppText>

      <AppText
        variant="body"
        color={Colors.gray[600]}
        align="center"
        className="mt-4 px-8"
      >
        Discover the best restaurants around you and get your favorite meals
        delivered in minutes.
      </AppText>
    </View>
  );
}
