export const Colors = {
  primary: {
    50: "#FFF4E8",
    100: "#FFE3C7",
    200: "#FFC58A",
    300: "#FFA34D",
    400: "#FF8A33",
    500: "#FF7A00",
    600: "#E66C00",
    700: "#BF5900",
    800: "#994700",
    900: "#733500",
  },

  secondary: {
    50: "#FBE9EC",
    100: "#F3C4CC",
    200: "#E4899B",
    300: "#D24F6B",
    400: "#B33951",
    500: "#7A0C1E",
    600: "#6B0A19",
    700: "#5A0815",
    800: "#480611",
    900: "#33040C",
  },

  accent: {
    500: "#C4172C",
  },

  success: {
    50: "#E8F5E9",
    500: "#4CAF50",
    600: "#66BB6A",
  },

  warning: {
    500: "#F59E0B",
  },

  danger: {
    500: "#EF4444",
  },

  info: {
    500: "#3B82F6",
  },

  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  gray: {
    50: "#FAFAFA",
    100: "#F3F4F6",
    200: "#EDEDED",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },
};

export const Theme = {
  light: {
    background: Colors.gray[50],
    surface: Colors.white,
    surfaceElevated: Colors.white,
    border: Colors.gray[200],
    textPrimary: "#1A1A1A",
    textSecondary: Colors.gray[500],
    textMuted: Colors.gray[400],
    iconDefault: Colors.gray[400],
    iconOnBrand: Colors.white,
    brandPrimary: Colors.primary[500],
    brandSecondary: Colors.secondary[500],
    gradientStart: Colors.accent[500],
    gradientEnd: Colors.primary[500],
    success: Colors.success[500],
    warning: Colors.warning[500],
    successBg: Colors.success[50],
    brandSubtle: Colors.primary[50],
  },

  dark: {
    background: "#121212",
    surface: "#1E1E1E",
    surfaceElevated: "#242424",
    border: "#2E2E2E",
    textPrimary: "#F2F2F2",
    textSecondary: "#A0A0A0",
    textMuted: "#7A7A7A",
    iconDefault: "#7A7A7A",
    iconOnBrand: "#1A1A1A",
    brandPrimary: Colors.primary[400],
    brandSecondary: Colors.secondary[400],
    gradientStart: Colors.secondary[400],
    gradientEnd: Colors.primary[400],
    success: Colors.success[600],
    warning: Colors.warning[500],
    successBg: "#1B3A1D",
    brandSubtle: "#2A1F14",
  },
};
