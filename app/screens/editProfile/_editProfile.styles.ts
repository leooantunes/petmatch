import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const createEditProfileStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen,
    },
    scrollContent: {
      padding: SPACING.xl,
      marginTop: SPACING.lg,
      paddingBottom: SPACING.xl + 120,
    },
    header: {
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.extraBold,
      color: colors.textBrand,
      marginBottom: SPACING.sm,
    },
    subtitle: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandMuted,
      marginBottom: SPACING.xl,
      lineHeight: 22,
    },
    label: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandStrong,
      marginBottom: SPACING.sm,
      fontWeight: FONT_WEIGHT.medium,
    },
    photoSection: {
      alignSelf: "center",
      marginBottom: SPACING.lg,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.surfaceTint,
    },
    photoOverlay: {
      position: "absolute",
      right: 0,
      bottom: 0,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.card,
    },
    photoHint: {
      textAlign: "center",
      color: colors.textBrandMuted,
      fontSize: FONT_SIZE.sm,
      marginBottom: SPACING.lg,
    },
    input: {
      width: "100%",
      height: 52,
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderRadius: BORDER_RADIUS.md,
      paddingHorizontal: SPACING.md,
      marginBottom: SPACING.lg,
      fontSize: FONT_SIZE.md,
      backgroundColor: colors.card,
      color: colors.textBrand,
      fontWeight: FONT_WEIGHT.bold,
    },
    button: {
      marginTop: SPACING.md,
      borderRadius: BORDER_RADIUS.lg,
    },
    cancelButton: {
      marginTop: SPACING.sm,
    },
    deleteAccountButton: {
      marginTop: SPACING.md,
      alignSelf: "center",
      paddingVertical: SPACING.sm,
      paddingHorizontal: SPACING.md,
    },
    deleteAccountText: {
      color: colors.error,
      fontSize: FONT_SIZE.sm,
      fontWeight: FONT_WEIGHT.bold,
    },
  });
