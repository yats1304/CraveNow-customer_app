import { useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import { cn } from "@/utils/cn";
import { Colors } from "@/components/theme";
import { AppText } from "../Text";
import { AppIcon } from "../AppIcon";
import { AvatarProps } from "./Avatar.types";
import { avatarSizes } from "./avatarSizes";

// Helper function to extract up to 2 initials from a name string
function getInitials(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Avatar({
  source,
  name,
  size = "md",
  online = false,
  style,
  className,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const sizeConfig = avatarSizes[size];
  const initials = getInitials(name);

  return (
    <View
      style={[
        {
          width: sizeConfig.size,
          height: sizeConfig.size,
        },
        style,
      ]}
      className={cn(
        "relative rounded-full justify-center items-center bg-gray-100",
        className
      )}
    >
      {source && !imageError ? (
        <Image
          source={source}
          onError={() => setImageError(true)}
          className="w-full h-full rounded-full"
          contentFit="cover"
        />
      ) : initials ? (
        <AppText
          variant={sizeConfig.textVariant}
          weight="600"
          className="text-gray-600"
        >
          {initials}
        </AppText>
      ) : (
        <AppIcon
          name="person"
          size={sizeConfig.size * 0.5}
          color={Colors.gray[400]}
        />
      )}

      {online && (
        <View
          style={{
            width: sizeConfig.indicatorSize,
            height: sizeConfig.indicatorSize,
            bottom: 0,
            right: 0,
          }}
          className="absolute rounded-full bg-success border-2 border-white"
        />
      )}
    </View>
  );
}
