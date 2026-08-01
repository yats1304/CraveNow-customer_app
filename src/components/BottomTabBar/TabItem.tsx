import { Theme } from "@/components/theme";
import {
  House,
  Package,
  Search,
  ShoppingCart,
  User,
} from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TabItemProps } from "./types";

const ICONS = {
  home: House,
  search: Search,
  cart: ShoppingCart,
  orders: Package,
  profile: User,
} as const;

const RAISED_ROUTE = "cart";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabItem = ({
  routeKey,
  routeName,
  label,
  focused,
  onPress,
}: TabItemProps) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;
  const scale = useSharedValue(1);

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const Icon = ICONS[routeName as keyof typeof ICONS] ?? House;
  const isRaised = routeName === RAISED_ROUTE;

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  if (isRaised) {
    return (
      <AnimatedPressable
        onPress={() => onPress(routeKey, routeName)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[pressStyle, { marginTop: -28 }]}
        className="flex-1 items-center justify-start"
      >
        <View
          className="items-center justify-center"
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: theme.brandPrimary,
            shadowColor: theme.brandPrimary,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 8,
            borderWidth: 3,
            borderColor: theme.surface,
          }}
        >
          <Icon size={24} color={theme.iconOnBrand} strokeWidth={2.3} />
        </View>

        <Text
          className="mt-1 text-[11px]"
          style={{
            color: theme.brandPrimary,
            fontWeight: "700",
          }}
        >
          {label}
        </Text>
      </AnimatedPressable>
    );
  }

  const iconColor = focused ? theme.brandPrimary : theme.iconDefault;

  return (
    <AnimatedPressable
      onPress={() => onPress(routeKey, routeName)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={pressStyle}
      className="flex-1 items-center justify-center py-1.5"
    >
      <Icon size={22} color={iconColor} strokeWidth={2.3} />

      <Text
        className="mt-1 text-[11px]"
        style={{
          color: iconColor,
          fontWeight: focused ? "700" : "500",
        }}
      >
        {label}
      </Text>
    </AnimatedPressable>
  );
};

export default memo(TabItem);
