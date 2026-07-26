import { appStorage } from "@/services/storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { StatusBar } from "react-native";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeMode;
  colorScheme: "light" | "dark";
  isDark: boolean;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const [theme, setThemeState] = useState<ThemeMode>("system");

  useEffect(() => {
    const savedTheme = appStorage.getTheme() as ThemeMode | undefined;
    if (savedTheme) {
      setThemeState(savedTheme);
      setColorScheme(savedTheme);
    }
  }, [setColorScheme]);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    appStorage.setTheme(mode);
    setColorScheme(mode);
  };

  const toggleTheme = () => {
    const nextMode = colorScheme === "dark" ? "light" : "dark";
    setTheme(nextMode);
  };

  const activeColorScheme = colorScheme ?? "light";
  const isDark = activeColorScheme === "dark";

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme: activeColorScheme,
        isDark,
        setTheme,
        toggleTheme,
      }}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#171717" : "#FFFFFF"}
        translucent={false}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
