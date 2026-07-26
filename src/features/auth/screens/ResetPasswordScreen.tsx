import { showToast } from "@/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ResendOtp, ResetPasswordForm, ResetPasswordHeader } from "../components";

export function ResetPasswordScreen() {
  const router = useRouter();

  const { email, otp } = useLocalSearchParams<{
    email: string;
    otp?: string;
  }>();

  const handleResetPasswordSuccess = () => {
    showToast.success(
      "Password reset successfully! Please log in with your new password.",
    );
    router.replace("/(auth)/login");
  };

  const handleResetPasswordError = (error: any) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Unable to reset password. Please try again.";

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
            <ResetPasswordHeader />

            <ResetPasswordForm
              email={email ?? ""}
              otp={otp ?? ""}
              onSuccess={handleResetPasswordSuccess}
              onError={handleResetPasswordError}
            />
          </View>

          <ResendOtp email={email ?? ""} purpose="reset-password" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
