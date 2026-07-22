import { Button } from "@/components/ui";
import { getOrCreateDeviceId } from "@/utils/device";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useVerifyOtp } from "../hooks";
import { verifyOtpSchema } from "../schemas";
import { OtpInput } from "./OtpInput";

import type { VerifyOtpRequest } from "../types";

interface VerifyOtpFormProps {
  email: string;
  purpose?: "signup" | "reset-password";
  onSuccess?: (otp?: string) => void;
  onError?: (error: unknown) => void;
}

export function VerifyOtpForm({
  email,
  purpose,
  onSuccess,
  onError,
}: VerifyOtpFormProps) {
  const verifyOtpMutation = useVerifyOtp();

  const { control, handleSubmit, watch, setValue } = useForm<VerifyOtpRequest>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      email,
      otp: "",
      deviceId: getOrCreateDeviceId(),
    },
    mode: "onChange",
  });

  useEffect(() => {
    setValue("email", email);
  }, [email, setValue]);

  const otp = watch("otp");

  const onSubmit = (data: VerifyOtpRequest) => {
    if (purpose === "reset-password") {
      onSuccess?.(data.otp);
      return;
    }

    verifyOtpMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error);
      },
    });
  };

  return (
    <View className="mt-10 gap-8">
      <Controller
        control={control}
        name="otp"
        render={({ field }) => (
          <OtpInput value={field.value} onChange={field.onChange} />
        )}
      />

      <Button
        fullWidth
        loading={verifyOtpMutation.isPending}
        disabled={otp.length !== 6 || verifyOtpMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      >
        {verifyOtpMutation.isPending ? "Verifying OTP..." : "Verify OTP"}
      </Button>
    </View>
  );
}
