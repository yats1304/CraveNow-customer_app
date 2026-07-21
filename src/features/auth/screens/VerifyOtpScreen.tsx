import { showToast } from "@/utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ResendOtp, VerifyOtpForm, VerifyOtpHeader } from "../components";

export function VerifyOtpScreen() {
  const router = useRouter();

  const { email } = useLocalSearchParams<{
    email: string;
  }>();

  const handleVerifySuccess = () => {
    showToast.success("Email verified successfully!");
    // router.replace("/(tabs)" as any);
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
              onSuccess={handleVerifySuccess}
              onError={handleVerifyError}
            />
          </View>

          <ResendOtp email={email ?? ""} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
