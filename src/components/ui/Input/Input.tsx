import { View } from "react-native";
import BaseInput from "./BaseInput";
import { InputProps } from "./Input.types";
import InputError from "./InputError";
import InputHelper from "./InputHelper";
import InputLabel from "./InputLabel";
import { cn } from "@/utils/cn";

export default function Input({
  label,
  helperText,
  error,
  containerStyle,
  className,
  ...props
}: InputProps) {
  return (
    <View className={cn(className)} style={containerStyle}>
      {label && <InputLabel label={label} />}

      <BaseInput invalid={!!error} {...props} />

      {!!helperText && !error && <InputHelper text={helperText} />}

      {!!error && <InputError error={error} />}
    </View>
  );
}
