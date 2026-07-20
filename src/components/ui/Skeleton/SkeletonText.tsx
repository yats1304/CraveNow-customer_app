import { View } from "react-native";
import { cn } from "@/utils/cn";
import Skeleton from "./Skeleton";
import { SkeletonTextProps } from "./Skeleton.types";

export default function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  style,
  className,
}: SkeletonTextProps) {
  return (
    <View style={style} className={cn("flex-col gap-2.5 w-full", className)}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLast = index === lines - 1;
        return (
          <Skeleton
            key={index}
            variant="text"
            width={isLast ? lastLineWidth : "100%"}
            height={14}
          />
        );
      })}
    </View>
  );
}
