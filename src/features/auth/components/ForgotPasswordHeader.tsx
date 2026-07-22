import { AppText } from "@/components/ui";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export function ForgotPasswordHeader() {
  const router = useRouter();

  return (
    <View className="gap-6">
      <Pressable
        onPress={() => router.back()}
        className="h-11 w-11 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
      >
        <Feather name="arrow-left" size={22} color="#111827" />
      </Pressable>

      <View className="gap-2">
        <AppText variant="h1">Forgot Password?</AppText>

        <AppText variant="body" color="secondary">
          Don't worry! Enter your email address and we'll send you a
          verification code to reset your password.
        </AppText>
      </View>
    </View>
  );
}
