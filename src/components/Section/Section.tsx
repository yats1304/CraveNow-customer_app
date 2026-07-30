import { memo } from "react";
import { ReactNode } from "react";
import { View } from "react-native";
import SectionHeader from "../SectionHeader";

export interface SectionProps {
  title: string;
  children: ReactNode;
  subtitle?: string;
  actionText?: string;
  onActionPress?: () => void;
  className?: string;
}

const Section = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  children,
  className = "",
}: SectionProps) => {
  return (
    <View className={`my-3 ${className}`}>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        actionText={actionText}
        onActionPress={onActionPress}
      />
      <View className="mt-2">{children}</View>
    </View>
  );
};

export default memo(Section);
