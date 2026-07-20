// InputIcon.tsx

import { ReactNode } from "react";
import { View } from "react-native";

interface InputIconProps {
  children: ReactNode;
}

export default function InputIcon({ children }: InputIconProps) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 8,
      }}
    >
      {children}
    </View>
  );
}
