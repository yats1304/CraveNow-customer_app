import { useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { cn } from "@/utils/cn";
import { AppText } from "../Text";
import { OTPInputProps } from "./OTPInput.types";

export default function OTPInput({
  length = 4,
  onComplete,
  error = false,
  disabled = false,
  style,
  className,
}: OTPInputProps) {
  const [code, setCode] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  };

  const handleChangeText = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, "").slice(0, length);
    setCode(cleanedText);

    if (cleanedText.length === length) {
      onComplete(cleanedText);
    }
  };

  const codeChars = code.split("");

  return (
    <Pressable
      onPress={handlePress}
      style={style}
      className={cn(
        "flex-row justify-center items-center relative py-2",
        className
      )}
    >
      {/* Hidden text input capturing input focus, paste, and auto-completions */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleChangeText}
        maxLength={length}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        editable={!disabled}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />

      <View className="flex-row gap-3">
        {Array.from({ length }).map((_, index) => {
          const char = codeChars[index] || "";
          const isCurrent = index === code.length;
          const isBlockFocused = focused && isCurrent;

          return (
            <View
              key={index}
              className={cn(
                "w-12 h-14 rounded-xl border bg-white justify-center items-center",
                char ? "border-primary" : "border-gray-200",
                isBlockFocused && "border-primary shadow-sm shadow-primary/20",
                error && "border-danger",
                disabled && "bg-gray-50 border-gray-100 opacity-60"
              )}
            >
              <AppText variant="h2" weight="600" className="text-gray-900">
                {char}
              </AppText>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}
