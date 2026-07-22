import { showToast } from "@/utils";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AuthDivider,
  SignupFooter,
  SignupForm,
  SignupHeader,
  SocialLogin,
} from "../components";

export function SignupScreen() {
  const router = useRouter();

  const handleSignupSuccess = (data: { email: string }) => {
    showToast.success(
      "Account created successfully. Please verify your email.",
    );

    router.push({
      pathname: "/(auth)/verify-otp",
      params: {
        email: data.email,
        purpose: "signup",
      },
    } as any);
  };

  const handleSignupError = (error: any) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Unable to create account. Please try again.";

    showToast.error(message);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
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
            <SignupHeader />

            <SignupForm
              onSuccess={handleSignupSuccess}
              onError={handleSignupError}
            />
          </View>

          <View className="mt-8">
            <AuthDivider />

            <SocialLogin />

            <SignupFooter />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
