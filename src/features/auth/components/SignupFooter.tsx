import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { AppText } from "@/components/ui";

export function SignupFooter() {
  const router = useRouter();

  return (
    <View className="mt-8 flex-row items-center justify-center">
      <AppText color="secondary">Already have an account?</AppText>

      <Pressable onPress={() => router.replace("/(auth)/login")}>
        <AppText color="primary" className="ml-2" weight="600">
          Login
        </AppText>
      </Pressable>
    </View>
  );
}
