import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthActions } from "../components/AuthActions";
import { WelcomeHero } from "../components/WelcomeHero";

export function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 py-8">
        <View className="flex-1 justify-center">
          <WelcomeHero />
        </View>

        <AuthActions />
      </View>
    </SafeAreaView>
  );
}
