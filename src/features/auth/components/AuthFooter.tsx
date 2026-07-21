import { AppText } from "@/components/ui";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export function AuthFooter() {
  const router = useRouter();

  return (
    <View className="mt-8 flex-row justify-center">
      <AppText color="secondary">Don't have an account?</AppText>

      <Pressable onPress={() => router.replace("/(auth)/signup")}>
        <AppText color="primary" className="ml-2 font-semibold">
          Create Account
        </AppText>
      </Pressable>
    </View>
  );
}
