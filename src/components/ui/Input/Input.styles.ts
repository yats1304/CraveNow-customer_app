import { Colors } from "@/components/theme";
import { TextStyle, ViewStyle } from "react-native";
import { InputSize, InputVariant } from "./Input.types";
import { inputSizes } from "./inputSizes";
import { inputVariants } from "./inputVariants";

interface StyleResolverProps {
  variant: InputVariant;
  size: InputSize;
  focused: boolean;
  invalid: boolean;
  editable: boolean;
}

export function resolveInputStyles({
  variant,
  size,
  focused,
  invalid,
  editable,
}: StyleResolverProps) {
  const variantStyle = inputVariants[variant];
  const sizeStyle = inputSizes[size];

  let borderColor = Colors.gray[300];
  if (!editable) {
    borderColor = Colors.gray[200];
  } else if (invalid) {
    borderColor = Colors.danger[500];
  } else if (focused) {
    borderColor = Colors.primary[500];
  }

  const containerStyle: ViewStyle = {
    ...variantStyle,
    height: sizeStyle.height,
    borderRadius: sizeStyle.borderRadius,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    flexDirection: "row",
    alignItems: "center",
    opacity: editable ? 1 : 0.6,
    ...(variant === "underlined"
      ? {
          borderColor: "transparent",
          borderBottomColor: borderColor,
          borderBottomWidth: focused ? 1.5 : 1,
        }
      : {
          borderColor,
          borderWidth:
            variant === "outlined" ? (focused || invalid ? 1.5 : 1) : 0,
        }),
  };

  const inputStyle: TextStyle = {
    flex: 1,
    fontSize: sizeStyle.fontSize,
    color: Colors.gray[900],
  };

  return {
    containerStyle,
    inputStyle,
  };
}
