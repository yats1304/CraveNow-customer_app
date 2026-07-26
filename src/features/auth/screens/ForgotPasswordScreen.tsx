import { showToast } from "@/utils";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ForgotPasswordForm, ForgotPasswordHeader } from "../components";

export function ForgotPasswordScreen() {
  const handleForgotPasswordSuccess = () => {
    showToast.success("Verification code has been sent to your email.");
  };

  const handleForgotPasswordError = (error: any) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Unable to send verification code.";

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
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ForgotPasswordHeader />

          <ForgotPasswordForm
            onSuccess={handleForgotPasswordSuccess}
            onError={handleForgotPasswordError}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
