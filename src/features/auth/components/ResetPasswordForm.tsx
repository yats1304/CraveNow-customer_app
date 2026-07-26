import { AppText, Button, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useResetPassword } from "../hooks";
import { resetPasswordSchema } from "../schemas";
import type { ResetPasswordRequest } from "../types";
import { OtpInput } from "./OtpInput";

interface ResetPasswordFormProps {
  email: string;
  otp?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

type ResetPasswordFormData = ResetPasswordRequest & {
  confirmPassword: string;
};

export function ResetPasswordForm({
  email,
  otp = "",
  onSuccess,
  onError,
}: ResetPasswordFormProps) {
  const resetPasswordMutation = useResetPassword();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email,
      otp,
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (email) setValue("email", email);
    if (otp) setValue("otp", otp);
  }, [email, otp, setValue]);

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPasswordMutation.mutate(
      {
        email: data.email,
        otp: data.otp,
        password: data.password,
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      },
    );
  };

  return (
    <View className="mt-8 gap-6">
      <View className="gap-2">
        <AppText weight="500">Verification Code (OTP)</AppText>
        <Controller
          control={control}
          name="otp"
          render={({ field, fieldState }) => (
            <View>
              <OtpInput
                value={field.value}
                onChange={field.onChange}
                autoFocus={!otp}
              />
              {fieldState.error?.message ? (
                <AppText className="mt-1 text-xs text-danger">
                  {fieldState.error.message}
                </AppText>
              ) : null}
            </View>
          )}
        />
      </View>

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            label="New Password"
            placeholder="Enter new password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <Input
            label="Confirm New Password"
            placeholder="Re-enter new password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button
        fullWidth
        loading={resetPasswordMutation.isPending}
        disabled={!isValid || resetPasswordMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      >
        {resetPasswordMutation.isPending
          ? "Resetting Password..."
          : "Reset Password"}
      </Button>
    </View>
  );
}
