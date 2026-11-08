/**
 * Theme Hook
 * Provides dynamic theme (light/dark) with color tokens based on system preference
 */

import { useMemo } from 'react';
import { StatusBarStyle, useColorScheme } from 'react-native';
import { designTokens } from '../constants/designTokens';

export type ThemeType = 'light' | 'dark';

/** Every color token, typed from the light palette (dark must define the same keys). */
export type ThemeColors = {
  [K in keyof typeof designTokens.colors.light]: string;
};

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
  statusBarStyle: StatusBarStyle;
}

const themes: Record<ThemeType, Theme> = {
  light: {
    colors: designTokens.colors.light,
    type: 'light',
    isDark: false,
    shadows: designTokens.shadows.light,
    statusBarStyle: 'dark-content',
  },
  dark: {
    colors: designTokens.colors.dark,
    type: 'dark',
    isDark: true,
    shadows: designTokens.shadows.dark,
    statusBarStyle: 'light-content',
  },
};

/**
 * useTheme Hook
 * Returns current theme colors and type based on system preference.
 * The returned object is stable per theme, so it is safe as a memo dependency.
 */
export function useTheme(): Theme {
  const colorScheme = useColorScheme();
  return themes[colorScheme === 'dark' ? 'dark' : 'light'];
}

/**
 * useThemedStyles
 * Builds a StyleSheet from the current theme and rebuilds it only when the theme changes.
 *
 * @example
 * const styles = useThemedStyles(createPetListStyles);
 */
export function useThemedStyles<T>(factory: (theme: Theme) => T): T {
  const theme = useTheme();
  return useMemo(() => factory(theme), [factory, theme]);
}

/**
 * Get colors for a specific theme (useful for static styles)
 */
export function getThemeColors(theme: ThemeType = 'light'): ThemeColors {
  return designTokens.colors[theme];
}

export default useTheme;
