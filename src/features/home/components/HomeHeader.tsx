import { Colors } from "@/components/theme";
import AppText from "@/components/ui/Text/AppText";
import { Bell, ChevronDown, MapPin } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { HomeHeaderProps } from "../types/home.types";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";

  return "Good Evening";
};

const HomeHeader = ({
  userName,
  address,
  onAddressPress,
  onNotificationPress,
}: HomeHeaderProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const iconColor = isDark ? "#FAFAFA" : "#18181B";
  const primaryBrandColor = Colors?.primary?.[500] || "#E44A25";

  return (
    <View className="flex-col gap-y-3 px-4 pt-3 pb-2">
      {/* Top Bar: Address & Notification */}
      <View className="flex-row items-center justify-between">
        {/* Address Selection */}
        <Pressable
          onPress={onAddressPress}
          className="flex-1 mr-3 flex-col justify-center"
          hitSlop={8}
        >
          <View className="flex-row items-center gap-x-1 mb-0.5">
            <AppText
              variant="caption"
              color="muted"
              className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400"
            >
              DELIVER TO
            </AppText>
          </View>

          <View className="flex-row items-center gap-x-1.5">
            <MapPin size={18} color={primaryBrandColor} />

            <AppText
              variant="body"
              weight="700"
              numberOfLines={1}
              className="text-base text-neutral-900 dark:text-neutral-50 flex-shrink"
            >
              {address || "Select Location"}
            </AppText>

            <ChevronDown size={18} color={primaryBrandColor} />
          </View>
        </Pressable>

        {/* Notification Bell Button */}
        <Pressable
          onPress={onNotificationPress}
          className="relative w-10 h-10 rounded-full bg-neutral-100 dark:bg-zinc-800/80 items-center justify-center border border-neutral-200/60 dark:border-zinc-700/60 shadow-sm active:opacity-70"
          hitSlop={8}
        >
          <Bell size={20} color={iconColor} />
          {/* Notification Dot */}
          <View className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-500" />
        </Pressable>
      </View>

      {/* Greeting Header */}
      <View className="mt-1">
        <AppText
          variant="bodySmall"
          color="secondary"
          className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
        >
          {getGreeting()}, 👋
        </AppText>

        <AppText
          variant="h2"
          weight="700"
          className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight mt-0.5"
        >
          {userName}
        </AppText>
      </View>
    </View>
  );
};

export default memo(HomeHeader);
