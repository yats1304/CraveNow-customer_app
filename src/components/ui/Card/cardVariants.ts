import { CardVariant } from "./Card.types";

export const cardVariants: Record<CardVariant, string> = {
  elevated: "bg-white border border-gray-100/60 shadow-sm shadow-gray-200/50",
  outlined: "bg-white border border-gray-200",
  filled: "bg-gray-50 border border-transparent",
  ghost: "bg-transparent border border-transparent",
};
