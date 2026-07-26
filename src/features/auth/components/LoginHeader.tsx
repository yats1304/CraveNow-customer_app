import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { useColorScheme } from "nativewind";

import { AppText } from "@/components/ui";

export function LoginHeader() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/welcome");
    }
  };

  return (
    <View className="gap-6">
      <Pressable
        onPress={handleBack}
        className="h-11 w-11 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
      >
        <Feather name="arrow-left" size={22} color={isDark ? "#F9FAFB" : "#111827"} />
      </Pressable>

      <View className="gap-2">
        <AppText variant="h1">Welcome Back 👋</AppText>

        <AppText variant="body" color="secondary">
          Login to continue ordering your favorite meals.
        </AppText>
      </View>
    </View>
  );
}
