import { View } from "react-native";

import { AppText } from "@/components/ui";

export function AuthDivider() {
  return (
    <View className="my-6 flex-row items-center">
      <View className="h-px flex-1 bg-border" />

      <AppText className="mx-4" color="secondary">
        OR
      </AppText>

      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
