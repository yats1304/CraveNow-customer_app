import { Colors } from "@/components/theme";
import { AppText, Button, Checkbox, Input } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";

import { useRegister } from "../hooks";
import { registerSchema } from "../schemas";

import type { RegisterRequest } from "../types";

export function SignupForm({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: RegisterRequest) => void;
  onError?: (error: any) => void;
}) {
  const router = useRouter();

  const registerMutation = useRegister();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },

    mode: "onChange",
  });

  const acceptTerms = watch("acceptTerms");

  const onSubmit = (data: RegisterRequest) => {
    registerMutation.mutate(data, {
      onSuccess: () => onSuccess?.(data),
      onError: (error) => onError?.(error),
    });
  };

  return (
    <View className="mt-10 gap-5">
      <Controller
        control={control}
        name="fullName"
        render={({ field, fieldState }) => (
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            label="Email"
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

      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <Input
            label="Phone Number"
            placeholder="+91 1234567890"
            keyboardType="phone-pad"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            label="Password"
            placeholder="Enter password"
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
            label="Confirm Password"
            placeholder="Confirm password"
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
        name="acceptTerms"
        render={({ field }) => (
          <Checkbox
            checked={field.value}
            onChange={field.onChange}
            label="I agree to the Terms & Privacy Policy"
          />
        )}
      />

      <Button
        fullWidth
        loading={registerMutation.isPending}
        disabled={!isValid || registerMutation.isPending}
        onPress={handleSubmit(onSubmit)}
      >
        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
      </Button>

      {/* onPress={() => router.push("/terms")} */}
      <Pressable>
        <AppText align="center" color={Colors.primary[500]} weight="600">
          Read Terms & Conditions
        </AppText>
      </Pressable>
    </View>
  );
}
