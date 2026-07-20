import { Colors, Typography } from "@/components/theme";

export const textVariants = {
  display: {
    fontSize: Typography.fontSize["4xl"],
    lineHeight: Typography.lineHeight["3xl"],
    fontWeight: "700",
  },

  h1: {
    fontSize: Typography.fontSize["3xl"],
    lineHeight: Typography.lineHeight["2xl"],
    fontWeight: "700",
  },

  h2: {
    fontSize: Typography.fontSize["2xl"],
    lineHeight: Typography.lineHeight["xl"],
    fontWeight: "700",
  },

  h3: {
    fontSize: Typography.fontSize.xl,
    lineHeight: Typography.lineHeight.lg,
    fontWeight: "600",
  },

  body: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.md,
    fontWeight: "400",
  },

  bodySmall: {
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.sm,
    fontWeight: "400",
  },

  caption: {
    fontSize: Typography.fontSize.xs,
    lineHeight: Typography.lineHeight.xs,
    fontWeight: "400",
    color: Colors.gray[500],
  },

  button: {
    fontSize: Typography.fontSize.md,
    fontWeight: "600",
  },
} as const;

export type TextVariant = keyof typeof textVariants;
