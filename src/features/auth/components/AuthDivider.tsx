import { View } from "react-native";

import { AppText } from "@/components/ui";

export function AuthDivider() {
  return (
    <View className="my-6 flex-row items-center">
      <View className="h-px flex-1 bg-gray-200 dark:bg-neutral-800" />

      <AppText className="mx-4" color="secondary">
        OR
      </AppText>

      <View className="h-px flex-1 bg-gray-200 dark:bg-neutral-800" />
    </View>
  );
}
