export const COLORS = {
  // Verdes - Paleta Primary
  primary: "#198a4d",
  primaryDark: "#006b2e",
  primaryDarker: "#134a2d",
  primaryMedium: "#2a6f3f",
  primaryLight: "#4b8057",

  // Verdes - Paleta Light/Background
  backgroundLight: "#e9f5ea",
  backgroundVeryLight: "#f5fff5",
  borderLight: "#a8d5b0",
  borderVeryLight: "#cce5d1",

  // Neutros
  white: "#ffffff",
  black: "#171717",

  // Sociais
  google: "#de5245",
  facebook: "#3b5998",
  apple: "#171717",

  // Shadows
  shadowColor: "#2b6f39",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 20,
  full: 999,
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
};

export const FONT_WEIGHT = {
  regular: "400" as const,
  medium: "600" as const,
  bold: "700" as const,
  extraBold: "800" as const,
};

export default { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT };
