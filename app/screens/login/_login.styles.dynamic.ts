/**
 * Dynamic Login Styles with Dark Mode Support
 * Generated based on current theme
 */

import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { FONT_SIZE, SPACING } from '../../styles/colors';
import { ThemeColors, ShadowTokens } from '../../hooks/useTheme';

export interface LoginStyles {
  screen: ViewStyle;
  container: ViewStyle;
  logo: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  primaryButton: ViewStyle;
  primaryButtonText: TextStyle;
  pressed: ViewStyle;
  dividerRow: ViewStyle;
  divider: ViewStyle;
  dividerText: TextStyle;
  appleButton: ViewStyle;
  googleButton: ViewStyle;
  googleButtonText: TextStyle;
  spacer: ViewStyle;
  secondaryButton: ViewStyle;
  secondaryButtonText: TextStyle;
}

/**
 * Create login styles dynamically based on theme colors
 */
export function createLoginStyles(
  colors: ThemeColors,
  shadows: ShadowTokens
): LoginStyles {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    } as ViewStyle,
    container: {
      flexGrow: 1,
      paddingHorizontal: SPACING.lg,
    } as ViewStyle,
    logo: {
      width: 72,
      height: 72,
      borderRadius: 16,
      marginBottom: SPACING.xl,
      ...shadows.md,
    } as ViewStyle,
    title: {
      fontSize: 34,
      fontFamily: 'Inter_800ExtraBold',
      color: colors.text,
      letterSpacing: -0.5,
    } as TextStyle,
    subtitle: {
      fontSize: FONT_SIZE.md,
      color: colors.textSecondary,
      marginTop: SPACING.xs,
      marginBottom: SPACING.xxl + SPACING.sm,
    } as TextStyle,
    primaryButton: {
      height: 52,
      backgroundColor: colors.primary,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: SPACING.sm,
      ...shadows.md,
    } as ViewStyle,
    primaryButtonText: {
      color: colors.background,
      fontFamily: 'Inter_700Bold',
      fontSize: FONT_SIZE.md + 1,
    } as TextStyle,
    pressed: {
      opacity: 0.7,
    } as ViewStyle,
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
      marginVertical: SPACING.xxl,
    } as ViewStyle,
    divider: {
      flex: 1,
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.border,
    } as ViewStyle,
    dividerText: {
      color: colors.textSecondary,
      fontSize: FONT_SIZE.sm,
    } as TextStyle,
    appleButton: {
      height: 52,
      marginBottom: SPACING.md,
    } as ViewStyle,
    googleButton: {
      height: 52,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: SPACING.sm,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      ...shadows.sm,
    } as ViewStyle,
    googleButtonText: {
      color: colors.text,
      fontFamily: 'Inter_700Bold',
      fontSize: FONT_SIZE.md + 1,
    } as TextStyle,
    spacer: {
      flex: 1,
      minHeight: SPACING.xxl,
    } as ViewStyle,
    secondaryButton: {
      height: 52,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceAlt,
      borderWidth: 1,
      borderColor: colors.borderLight,
    } as ViewStyle,
    secondaryButtonText: {
      color: colors.primaryDark,
      fontFamily: 'Inter_700Bold',
      fontSize: FONT_SIZE.md + 1,
    } as TextStyle,
  });
}
