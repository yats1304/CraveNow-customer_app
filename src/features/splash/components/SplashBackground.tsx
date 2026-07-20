import { ImageBackground, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function SplashBackground({ children }: Props) {
  return (
    <ImageBackground
      source={require("@/assets/images/splash/pattern.png")}
      resizeMode="cover"
      style={styles.container}
      imageStyle={styles.image}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    opacity: 0.08,
    tintColor: "#FF5A1F",
    transform: [{ scale: 1.5 }],
  },
});
