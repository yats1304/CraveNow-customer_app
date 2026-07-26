import { showToast } from "@/utils";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AuthDivider,
  AuthFooter,
  LoginForm,
  LoginHeader,
  SocialLogin,
} from "../components";

export function LoginScreen() {
  const handleLoginSuccess = () => {
    showToast.success("You have successfully signed in.");
  };

  const handleLoginError = (error: any) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Invalid credentials. Please try again.";
    showToast.error(message);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            padding: 24,
            justifyContent: "space-between",
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <LoginHeader />

            <LoginForm
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </View>

          <View className="mt-8">
            <AuthDivider />

            <SocialLogin />

            <AuthFooter />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
