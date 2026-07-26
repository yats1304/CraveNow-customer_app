import { AppText } from "@/components/ui";
import { useEffect, useRef } from "react";
import { Pressable, TextInput, View } from "react-native";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  autoFocus?: boolean;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  autoFocus = true,
}: OtpInputProps) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [autoFocus]);

  const handleChange = (text: string) => {
    const formatted = text.replace(/\D/g, "").slice(0, length);

    onChange(formatted);
  };

  return (
    <Pressable onPress={() => inputRef.current?.focus()}>
      <View className="flex-row justify-between">
        {Array.from({ length }).map((_, index) => {
          const digit = value[index] ?? "";
          const focused = value.length === index;

          return (
            <View
              key={index}
              className={`h-16 w-14 items-center justify-center rounded-2xl border
                ${
                  focused
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                }`}
            >
              <AppText variant="h2">{digit}</AppText>
            </View>
          );
        })}
      </View>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        caretHidden
        className="absolute h-0 w-0 opacity-0"
      />
    </Pressable>
  );
}
