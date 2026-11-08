/**
 * Design System Tokens
 * Centralized design tokens for colors, spacing, typography, borders, and shadows
 */

export const designTokens = {
  // Color Tokens
  colors: {
    light: {
      // Background
      background: '#FFFFFF',
      surface: '#F5F5F5',
      surfaceAlt: '#E9F5EA',

      // Text
      text: '#171717',
      textSecondary: '#6E6E73',
      textTertiary: '#999999',

      // Brand Colors
      primary: '#198A4D',
      primaryDark: '#006B2E',
      primaryDarker: '#134A2D',
      primaryMedium: '#2A6F3F',
      primaryLight: '#4B8057',

      // Accents & Status
      success: '#198a4d',
      error: '#D70015',
      warning: '#FF9500',
      info: '#007AFF',

      // Social
      google: '#DE5245',
      facebook: '#3B5998',
      apple: '#171717',

      // UI Elements
      border: '#E5E5EA',
      borderLight: '#A8D5B0',
      borderVeryLight: '#CCE5D1',
      divider: '#E5E5EA',
      field: '#F2F2F7',

      // Shadows
      shadowColor: '#2B6F39',

      // Semantic surfaces
      screen: '#E9F5EA',
      card: '#FFFFFF',
      surfaceTint: '#F5FFF5',

      // Semantic text
      onPrimary: '#FFFFFF',
      textBrand: '#006B2E',
      textBrandStrong: '#134A2D',
      textBrandMuted: '#2A6F3F',
      textBrandSoft: '#4B8057',
      placeholder: '#8FB89A',
      overlay: 'rgba(15, 23, 42, 0.55)',
    },
    dark: {
      // Background
      background: '#1A1A1A',
      surface: '#2A2A2A',
      surfaceAlt: '#1E3A2F',

      // Text
      text: '#FFFFFF',
      textSecondary: '#999999',
      textTertiary: '#666666',

      // Brand Colors
      primary: '#4B8057',
      primaryDark: '#2D5F3A',
      primaryDarker: '#1E4B2A',
      primaryMedium: '#3A6D47',
      primaryLight: '#6BA573',

      // Accents & Status
      success: '#4B8057',
      error: '#FF6B6B',
      warning: '#FFB84D',
      info: '#52B0FF',

      // Social
      google: '#FF8C82',
      facebook: '#6B8FCA',
      apple: '#F5F5F5',

      // UI Elements
      border: '#3A3A3A',
      borderLight: '#4A6B52',
      borderVeryLight: '#3A5A42',
      divider: '#333333',
      field: '#2A2A2A',

      // Shadows
      shadowColor: '#000000',

      // Semantic surfaces
      screen: '#101612',
      card: '#1C231E',
      surfaceTint: '#1F2B23',

      // Semantic text
      onPrimary: '#FFFFFF',
      textBrand: '#8FD19E',
      textBrandStrong: '#DCEFE0',
      textBrandMuted: '#A9CDB1',
      textBrandSoft: '#86B48F',
      placeholder: '#5F7D67',
      overlay: 'rgba(0, 0, 0, 0.65)',
    },
  },

  // Spacing Scale
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    xxxxl: 40,
  },

  // Typography
  typography: {
    // Font Sizes
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
      xxxl: 40,
    },
    // Font Weights
    fontWeight: {
      regular: '400' as const,
      medium: '600' as const,
      bold: '700' as const,
      extraBold: '800' as const,
    },
    // Line Heights
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
    },
  },

  // Border Radius
  borderRadius: {
    sm: 8,
    md: 10,
    lg: 12,
    xl: 20,
    full: 999,
  },

  // Border Width
  borderWidth: {
    thin: 1,
    default: 1,
    thick: 2,
    thicker: 3,
  },

  // Shadows / Elevation Levels
  shadows: {
    light: {
      sm: {
        shadowColor: '#2B6F39',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
      },
      md: {
        shadowColor: '#2B6F39',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
      },
      lg: {
        shadowColor: '#2B6F39',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 8,
      },
    },
    dark: {
      sm: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 2,
      },
      md: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 4,
      },
      lg: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.6,
        shadowRadius: 16,
        elevation: 8,
      },
    },
  },

  // Animation Durations (in milliseconds)
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
  },

  // Z-index Scale
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 500,
    modal: 1000,
    popover: 1100,
    tooltip: 1200,
  },
};

export type DesignTokens = typeof designTokens;
export default designTokens;
