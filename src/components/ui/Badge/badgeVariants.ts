import { Colors } from "@/components/theme";

export const badgeVariants = {
  success: {
    container: "bg-green-50 border border-green-100/40",
    textColor: Colors.success[500],
  },
  warning: {
    container: "bg-amber-50 border border-amber-100/40",
    textColor: Colors.warning[500],
  },
  danger: {
    container: "bg-red-50 border border-red-100/40",
    textColor: Colors.danger[500],
  },
  info: {
    container: "bg-blue-50 border border-blue-100/40",
    textColor: Colors.info[500],
  },
  primary: {
    container: "bg-orange-50 border border-orange-100/40",
    textColor: Colors.primary[500],
  },
  secondary: {
    container: "bg-gray-100 border border-gray-200/40",
    textColor: Colors.gray[700],
  },
};

export const badgeSizes = {
  sm: {
    container: "px-2 py-0.5",
    textVariant: "caption" as const,
  },
  md: {
    container: "px-2.5 py-1",
    textVariant: "bodySmall" as const,
  },
  lg: {
    container: "px-3.5 py-1.5",
    textVariant: "body" as const,
  },
};
