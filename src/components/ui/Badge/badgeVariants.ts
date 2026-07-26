import { Colors } from "@/components/theme";

export const badgeVariants = {
  success: {
    container:
      "bg-green-50 dark:bg-green-950/40 border border-green-100/40 dark:border-green-800/40",
    textColor: Colors.success[500],
  },
  warning: {
    container:
      "bg-amber-50 dark:bg-amber-950/40 border border-amber-100/40 dark:border-amber-800/40",
    textColor: Colors.warning[500],
  },
  danger: {
    container:
      "bg-red-50 dark:bg-red-950/40 border border-red-100/40 dark:border-red-800/40",
    textColor: Colors.danger[500],
  },
  info: {
    container:
      "bg-blue-50 dark:bg-blue-950/40 border border-blue-100/40 dark:border-blue-800/40",
    textColor: Colors.info[500],
  },
  primary: {
    container:
      "bg-orange-50 dark:bg-orange-950/40 border border-orange-100/40 dark:border-orange-800/40",
    textColor: Colors.primary[500],
  },
  secondary: {
    container:
      "bg-gray-100 dark:bg-neutral-800 border border-gray-200/40 dark:border-neutral-700/40",
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
