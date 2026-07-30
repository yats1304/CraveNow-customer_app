import { memo } from "react";
import { useColorScheme } from "nativewind";
import { Skeleton as MotiSkeleton } from "moti/skeleton";
import { Colors } from "@/components/theme";

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
  colorMode?: "light" | "dark";
  colors?: string[];
}

const Skeleton = ({
  width = "100%",
  height = 20,
  radius = 12,
  colorMode: customColorMode,
  colors: customColors,
}: SkeletonProps) => {
  const { colorScheme } = useColorScheme();
  const colorMode =
    customColorMode || (colorScheme === "dark" ? "dark" : "light");

  const isDark = colorMode === "dark";

  // CraveNow Theme Colors Palette
  const defaultColors = isDark
    ? [Colors.gray[800], Colors.gray[700], Colors.gray[800]]
    : [Colors.gray[100], Colors.gray[200], Colors.gray[100]];

  return (
    <MotiSkeleton
      width={width as any}
      height={height}
      radius={radius}
      colorMode={colorMode}
      colors={customColors || defaultColors}
    />
  );
};

export default memo(Skeleton);
