import { showToast } from "@/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ResendOtp, VerifyOtpForm, VerifyOtpHeader } from "../components";

export function VerifyOtpScreen() {
  const router = useRouter();

  const { email, purpose } = useLocalSearchParams<{
    email: string;
    purpose: "signup" | "reset-password";
  }>();

  const handleVerifySuccess = (otpCode?: string) => {
    if (purpose === "reset-password") {
      showToast.success("Code entered! Please set your new password.");
      router.replace({
        pathname: "/(auth)/reset-password",
        params: { email: email ?? "", otp: otpCode ?? "" },
      } as any);
    } else {
      showToast.success("Email verified successfully!");
      router.replace("/(auth)/login");
    }
  };

  const handleVerifyError = (error: any) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Invalid verification code.";

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
            <VerifyOtpHeader email={email ?? ""} />

            <VerifyOtpForm
              email={email ?? ""}
              purpose={purpose}
              onSuccess={handleVerifySuccess}
              onError={handleVerifyError}
            />
          </View>

          <ResendOtp email={email ?? ""} purpose={purpose} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
