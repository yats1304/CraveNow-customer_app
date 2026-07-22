import { Button, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { useForgotPassword } from "../hooks";
import { forgotPasswordSchema } from "../schemas";
import type { ForgotPasswordRequest } from "../types";

interface ForgotPasswordFormProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function ForgotPasswordForm({
  onSuccess,
  onError,
}: ForgotPasswordFormProps) {
  const router = useRouter();

  const forgotPasswordMutation = useForgotPassword();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: "",
    },

    mode: "onChange",
  });

  const onSubmit = (data: ForgotPasswordRequest) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();

        router.push({
          pathname: "/(auth)/verify-otp",
          params: {
            email: data.email,
            purpose: "reset-password",
          },
        });
      },

      onError: (error) => {
        onError?.(error);
      },
    });
  };

  return (
    <View className="mt-10 gap-6">
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            label="Email Address"
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Button
        fullWidth
        loading={forgotPasswordMutation.isPending}
        disabled={!isValid || forgotPasswordMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      >
        Send Verification Code
      </Button>
    </View>
  );
}
