import { Colors } from "@/components/theme";

export const buttonVariants = {
  primary: {
    backgroundColor: Colors.primary[500],
    borderColor: Colors.primary[500],
    textColor: Colors.white,
  },

  secondary: {
    backgroundColor: Colors.gray[100],
    borderColor: Colors.gray[100],
    textColor: Colors.gray[900],
  },

  outline: {
    backgroundColor: "transparent",
    borderColor: Colors.primary[500],
    textColor: Colors.primary[500],
  },

  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    textColor: Colors.primary[500],
  },

  danger: {
    backgroundColor: Colors.danger[500],
    borderColor: Colors.danger[500],
    textColor: Colors.white,
  },
} as const;
