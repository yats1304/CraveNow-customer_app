import { Colors } from "@/components/theme";
import { AppText, Button, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { getOrCreateDeviceId } from "@/utils/device";
import { useLogin } from "../hooks";
import { loginSchema } from "../schemas";

import type { LoginRequest } from "../types";

export function LoginForm({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      deviceId: getOrCreateDeviceId(),
    },
    mode: "onChange",
  });

  const onSubmit = (data: LoginRequest) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
      onError: (error) => {
        onError?.(error);
      },
    });
  };

  return (
    <View className="mt-10 gap-5">
      {/* Email input field */}
      <Controller<LoginRequest, "email">
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            label="Email"
            placeholder="Enter your email"
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

      {/* Password input field */}
      <Controller<LoginRequest, "password">
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Pressable
        className="self-end"
        onPress={() => router.push("/(auth)/forgot-password" as any)}
      >
        <AppText color={Colors.primary[500]} weight="600">
          Forgot Password?
        </AppText>
      </Pressable>

      <Button
        fullWidth
        loading={loginMutation.isPending}
        disabled={!isValid || loginMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </View>
  );
}
