import { Colors } from "@/components/theme";
import { forwardRef, useState } from "react";
import { TextInput, View } from "react-native";
import { useColorScheme } from "nativewind";
import { resolveInputStyles } from "./Input.styles";
import { InputProps } from "./Input.types";
import InputIcon from "./InputIcon";
import PasswordToggle from "./PasswordToggle";
import { cn } from "@/utils/cn";

const BaseInput = forwardRef<TextInput, InputProps>(
  (
    {
      variant = "outlined",
      size = "md",
      leftIcon,
      rightIcon,
      secureTextEntry,
      editable = true,
      invalid = false,
      style,
      containerStyle,
      className,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const {
      containerStyle: resolvedContainerStyle,
      inputStyle: resolvedInputStyle,
    } = resolveInputStyles({
      variant,
      size,
      focused,
      invalid: invalid,
      editable,
      isDark,
    });

    return (
      <View
        className={cn(className)}
        style={[resolvedContainerStyle, containerStyle]}
      >
        {leftIcon && <InputIcon>{leftIcon}</InputIcon>}

        <TextInput
          ref={ref}
          {...props}
          editable={editable}
          secureTextEntry={secureTextEntry && !passwordVisible}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          className="flex-1 text-gray-900 dark:text-gray-100"
          style={[resolvedInputStyle, style]}
          placeholderTextColor={isDark ? "#9CA3AF" : Colors.gray[400]}
        />

        {secureTextEntry ? (
          <PasswordToggle
            visible={passwordVisible}
            onPress={() => setPasswordVisible((prev) => !prev)}
          />
        ) : (
          rightIcon && <InputIcon>{rightIcon}</InputIcon>
        )}
      </View>
    );
  },
);

BaseInput.displayName = "BaseInput";

export default BaseInput;
