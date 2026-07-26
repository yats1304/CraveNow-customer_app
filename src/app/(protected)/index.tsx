import { AppText, Button } from "@/components/ui";
import { authStorage } from "@/services/storage";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProtectedHomeScreen() {
  const router = useRouter();
  const user = authStorage.getUser();

  const handleLogout = () => {
    authStorage.clearSession();
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950 p-6 justify-center items-center">
      <View className="items-center gap-4 w-full max-w-sm">
        <AppText variant="h1" align="center">
          Welcome to CraveNow 🎉
        </AppText>
        <AppText variant="body" color="secondary" align="center">
          {user?.email ? `Logged in as ${user.email}` : "You are successfully authenticated!"}
        </AppText>

        <Button fullWidth variant="primary" onPress={handleLogout} className="mt-6">
          Log Out
        </Button>
      </View>
    </SafeAreaView>
  );
}
