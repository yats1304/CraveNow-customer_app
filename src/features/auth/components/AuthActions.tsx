import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { AppText, Button } from "@/components/ui";

export function AuthActions() {
  const router = useRouter();

  return (
    <View className="gap-4">
      <Button fullWidth onPress={() => router.push("/(auth)/signup")}>
        Get Started
      </Button>

      <View className="flex-row items-center justify-center">
        <AppText color="secondary">Already have an account?</AppText>

        <Pressable onPress={() => router.push("/(auth)/login")}>
          <AppText className="ml-2" color="primary" weight="600">
            LogIn
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}
