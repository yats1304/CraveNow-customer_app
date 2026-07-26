import { ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";

type Props = {
  children: React.ReactNode;
};

export default function SplashBackground({ children }: Props) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ImageBackground
      source={require("@/assets/images/splash/pattern.png")}
      resizeMode="cover"
      style={[styles.container, { backgroundColor: isDark ? "#171717" : "#FFFFFF" }]}
      imageStyle={styles.image}
    >
      <SafeAreaView style={styles.safeContainer} edges={["top", "bottom"]}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  safeContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    opacity: 0.08,
    tintColor: "#FF5A1F",
    transform: [{ scale: 1.5 }],
  },
});
