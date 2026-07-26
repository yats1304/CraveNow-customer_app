import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useTheme } from "@/providers";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      className="h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
      accessibilityRole="button"
      accessibilityLabel="Toggle Theme"
    >
      {isDark ? (
        <Feather name="sun" size={18} color="#FBBF24" />
      ) : (
        <Feather name="moon" size={18} color="#4B5563" />
      )}
    </Pressable>
  );
}
