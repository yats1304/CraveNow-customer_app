import { Colors } from "@/components/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { useColorScheme } from "nativewind";

interface Props {
  visible: boolean;
  onPress: () => void;
}

export default function PasswordToggle({ visible, onPress }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      hitSlop={10}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={visible ? "Hide password" : "Show password"}
    >
      <Ionicons
        size={22}
        color={isDark ? "#9CA3AF" : Colors.gray[500]}
        name={visible ? "eye-off-outline" : "eye-outline"}
      />
    </Pressable>
  );
}
