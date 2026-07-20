import { View } from "react-native";
import { cn } from "@/utils/cn";
import Skeleton from "./Skeleton";
import SkeletonText from "./SkeletonText";

interface SkeletonCardProps {
  hasAvatar?: boolean;
  className?: string;
}

export default function SkeletonCard({
  hasAvatar = true,
  className,
}: SkeletonCardProps) {
  return (
    <View
      className={cn(
        "p-4 border border-gray-100 rounded-2xl bg-white w-full gap-4",
        className
      )}
    >
      <View className="flex-row items-center gap-3">
        {hasAvatar && <Skeleton variant="circle" width={40} height={40} />}
        <View className="flex-1 gap-1.5">
          <Skeleton variant="text" width="40%" height={16} />
          <Skeleton variant="text" width="25%" height={12} />
        </View>
      </View>

      <Skeleton variant="rectangle" width="100%" height={160} />

      <SkeletonText lines={2} lastLineWidth="50%" />
    </View>
  );
}
