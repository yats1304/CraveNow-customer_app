import { CardVariant } from "./Card.types";

export const cardVariants: Record<CardVariant, string> = {
  elevated:
    "bg-white dark:bg-neutral-800 border border-gray-100/60 dark:border-neutral-700/60 shadow-sm shadow-gray-200/50",
  outlined:
    "bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700",
  filled: "bg-gray-50 dark:bg-neutral-800/60 border border-transparent",
  ghost: "bg-transparent border border-transparent",
};
