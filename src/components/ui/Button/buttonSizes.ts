import { Radius, Spacing, Typography } from "@/components/theme";

export const buttonSizes = {
  sm: {
    height: 40,
    paddingHorizontal: Spacing[4],
    borderRadius: Radius.md,
    fontSize: Typography.fontSize.sm,
  },

  md: {
    height: 48,
    paddingHorizontal: Spacing[5],
    borderRadius: Radius.lg,
    fontSize: Typography.fontSize.md,
  },

  lg: {
    height: 56,
    paddingHorizontal: Spacing[6],
    borderRadius: Radius.xl,
    fontSize: Typography.fontSize.lg,
  },
} as const;
