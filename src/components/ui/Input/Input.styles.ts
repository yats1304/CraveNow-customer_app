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
  isDark?: boolean;
}

export function resolveInputStyles({
  variant,
  size,
  focused,
  invalid,
  editable,
  isDark = false,
}: StyleResolverProps) {
  const sizeStyle = inputSizes[size];

  let borderColor = isDark ? "#404040" : Colors.gray[300];
  if (!editable) {
    borderColor = isDark ? "#262626" : Colors.gray[200];
  } else if (invalid) {
    borderColor = Colors.danger[500];
  } else if (focused) {
    borderColor = Colors.primary[500];
  }

  let backgroundColor = isDark ? "#171717" : Colors.white;
  if (variant === "filled") {
    backgroundColor = isDark ? "#262626" : Colors.gray[100];
  } else if (variant === "underlined") {
    backgroundColor = "transparent";
  }

  const containerStyle: ViewStyle = {
    backgroundColor,
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
    color: isDark ? "#F9FAFB" : Colors.gray[900],
  };

  return {
    containerStyle,
    inputStyle,
  };
}
