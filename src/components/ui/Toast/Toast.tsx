import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Animated, Platform, StatusBar, StyleSheet, Text } from "react-native";

export interface ToastRef {
  success: (message: string) => void;
  error: (message: string) => void;
}

const STATUS_BAR_HEIGHT =
  Platform.OS === "ios" ? 54 : (StatusBar.currentHeight ?? 24);

export const Toast = forwardRef<ToastRef, {}>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  const animatedValue = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef<any>(null);

  const BANNER_HEIGHT = STATUS_BAR_HEIGHT + 64;

  const openToast = (msg: string, toastType: "success" | "error") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setMessage(msg);
    setType(toastType);
    setVisible(true);

    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 380,
      useNativeDriver: true,
    }).start(() => {
      timeoutRef.current = setTimeout(() => {
        closeToast();
      }, 2500);
    });
  };

  const closeToast = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  useImperativeHandle(ref, () => ({
    success(msg: string) {
      openToast(msg, "success");
    },
    error(msg: string) {
      openToast(msg, "error");
    },
  }));

  if (!visible) return null;

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-BANNER_HEIGHT, 0],
  });

  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "#1E9E3E" : "#E11313";
  const textColor = isSuccess ? "#000000" : "#FFFFFF";

  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: BANNER_HEIGHT,
          backgroundColor,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.message, { color: textColor }]}>{message}</Text>
    </Animated.View>
  );
});

Toast.displayName = "Toast";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    // Push text below the status bar notch
    paddingTop: STATUS_BAR_HEIGHT + 12,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  message: {
    fontSize: 16,
    fontWeight: "700",
  },
});
