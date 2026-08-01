import { Theme } from "@/components/theme";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { ComponentProps, useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabItem from "./TabItem";

type TabBarProps = NonNullable<ComponentProps<typeof Tabs>["tabBar"]>;
type BottomTabBarProps = Parameters<TabBarProps>[0];

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === "dark" ? Theme.dark : Theme.light;

  const handleTabPress = useCallback(
    (routeKey: string, routeName: string) => {
      const isFocused = state.routes[state.index].key === routeKey;

      const event = navigation.emit({
        type: "tabPress",
        target: routeKey,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    },
    [navigation, state],
  );

  return (
    <View
      style={{
        position: "absolute",
        left: 16,
        right: 16,
        bottom: Math.max(insets.bottom, 12),
      }}
    >
      <View
        className="flex-row items-center justify-around px-2 py-1.5"
        style={{
          backgroundColor: theme.surface,
          borderRadius: 28,
          borderWidth: 1,
          borderColor: theme.border,
          overflow: "visible",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: colorScheme === "dark" ? 0.4 : 0.12,
          shadowRadius: 16,
          elevation: 10,
        }}
      >
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];

          const label =
            typeof options.tabBarLabel === "string"
              ? options.tabBarLabel
              : typeof options.title === "string"
                ? options.title
                : route.name;

          return (
            <TabItem
              key={route.key}
              routeKey={route.key}
              routeName={route.name}
              label={label}
              focused={focused}
              onPress={handleTabPress}
            />
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;
