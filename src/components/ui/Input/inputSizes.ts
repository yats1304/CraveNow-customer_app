import { Radius, Spacing, Typography } from "@/components/theme";

export const inputSizes = {
  sm: {
    height: 44,
    fontSize: Typography.fontSize.sm,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing[3],
  },

  md: {
    height: 52,
    fontSize: Typography.fontSize.md,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing[4],
  },

  lg: {
    height: 60,
    fontSize: Typography.fontSize.lg,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing[5],
  },
};
