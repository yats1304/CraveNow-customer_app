import { Colors } from "@/components/theme";
import { forwardRef, useState } from "react";
import { TextInput, View } from "react-native";
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

    const {
      containerStyle: resolvedContainerStyle,
      inputStyle: resolvedInputStyle,
    } = resolveInputStyles({
      variant,
      size,
      focused,
      invalid: invalid,
      editable,
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
          style={[resolvedInputStyle, style]}
          placeholderTextColor={Colors.gray[400]}
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
