import { Image } from "expo-image";
import { View } from "react-native";

import { AppText } from "@/components/ui";

const logoImg = require("@/assets/images/splash/cravenow-splash.png");

export function AuthLogo() {
  return (
    <View className="items-center">
      <Image
        source={logoImg}
        style={{ width: 80, height: 80 }}
        contentFit="contain"
      />

      <AppText variant="h2" className="mt-4">
        CraveNow
      </AppText>
    </View>
  );
}
