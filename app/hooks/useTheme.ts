/**
 * Theme Hook
 * Provides dynamic theme (light/dark) with color tokens based on system preference
 */

import { useColorScheme } from 'react-native';
import { designTokens } from '../constants/designTokens';

export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  primary: string;
  primaryDark: string;
  primaryDarker: string;
  primaryMedium: string;
  primaryLight: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  google: string;
  facebook: string;
  apple: string;
  border: string;
  borderLight: string;
  borderVeryLight: string;
  divider: string;
  field: string;
  shadowColor: string;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ShadowTokens {
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
}

export interface Theme {
  colors: ThemeColors;
  type: ThemeType;
  isDark: boolean;
  shadows: ShadowTokens;
}

/**
 * useTheme Hook
 * Returns current theme colors and type based on system preference
 * Automatically responds to system light/dark mode changes
 */
export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const themeType: ThemeType = isDark ? 'dark' : 'light';

  const colors = designTokens.colors[themeType] as ThemeColors;
  const shadows = designTokens.shadows[themeType] as ShadowTokens;

  return {
    colors,
    type: themeType,
    isDark,
    shadows,
  };
}

/**
 * Get colors for a specific theme (useful for static styles)
 */
export function getThemeColors(theme: ThemeType = 'light'): ThemeColors {
  return designTokens.colors[theme] as ThemeColors;
}

export default useTheme;
