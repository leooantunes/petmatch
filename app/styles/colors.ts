import { designTokens } from '../constants/designTokens';

/**
 * Backward compatible COLORS object (light theme only).
 * @deprecated Light-only and breaks dark mode. Use `useTheme().colors` or
 * `useThemedStyles(createXStyles)` from `hooks/useTheme` instead.
 */
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
  textSecondary: "#6e6e73",
  fieldBackground: "#f2f2f7",
  separator: "#e5e5ea",
  danger: "#d70015",

  // Sociais
  google: "#de5245",
  facebook: "#3b5998",
  apple: "#171717",

  // Shadows
  shadowColor: "#2b6f39",
};

export const SPACING = designTokens.spacing;

export const BORDER_RADIUS = designTokens.borderRadius;

export const FONT_SIZE = designTokens.typography.fontSize;

export const FONT_WEIGHT = designTokens.typography.fontWeight;

/**
 * Get theme-specific colors
 * @param theme - 'light' or 'dark'
 * @returns Colors object for the specified theme
 */
export function getColorsForTheme(theme: 'light' | 'dark') {
  return designTokens.colors[theme];
}

export default { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT };
