import { Colors } from "@/components/theme";

export const inputVariants = {
  outlined: {
    backgroundColor: Colors.white,
    borderColor: Colors.gray[300],
    borderWidth: 1,
  },

  filled: {
    backgroundColor: Colors.gray[100],
    borderWidth: 0,
  },

  underlined: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderColor: Colors.gray[300],
  },
} as const;
