import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";

import { AppText } from "@/components/ui";

import { useResendOtp } from "../hooks";

interface ResendOtpProps {
  email: string;
  initialTime?: number;
}

export function ResendOtp({ email, initialTime = 60 }: ResendOtpProps) {
  const resendMutation = useResendOtp();

  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleResend = () => {
    resendMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setSeconds(initialTime);
        },
      },
    );
  };

  return (
    <View className="mt-8 items-center">
      {seconds > 0 ? (
        <>
          <AppText color="secondary">Didn't receive the code?</AppText>

          <AppText className="mt-2" weight="600">
            Resend in {seconds}s
          </AppText>
        </>
      ) : (
        <>
          <AppText color="secondary">Didn't receive the code?</AppText>

          <Pressable disabled={resendMutation.isPending} onPress={handleResend}>
            <AppText className="mt-2" color="primary" weight="600">
              {resendMutation.isPending ? "Sending..." : "Resend OTP"}
            </AppText>
          </Pressable>
        </>
      )}
    </View>
  );
}
