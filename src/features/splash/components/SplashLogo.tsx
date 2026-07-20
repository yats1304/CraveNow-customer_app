import { Image, View } from "react-native";

export default function SplashLogo() {
  return (
    <View className="items-center">
      <Image
        source={require("@/assets/images/splash/cravenow-splash.png")}
        className="w-52 h-52"
        resizeMode="contain"
      />
    </View>
  );
}
