import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SPACING } from "../../styles/colors";

const ILLUSTRATION_SIZE = 120;

export const createEmptyListStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      paddingHorizontal: SPACING.xl,
      paddingVertical: SPACING.xxxl,
    },
    iconContainer: {
      width: 76,
      height: 76,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: SPACING.md,
      backgroundColor: colors.surfaceTint,
      borderRadius: BORDER_RADIUS.full,
      borderWidth: 1,
      borderColor: colors.borderVeryLight,
    },
    illustrationWrapper: {
      width: ILLUSTRATION_SIZE + SPACING.xxxl,
      height: ILLUSTRATION_SIZE + SPACING.xxxl,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: SPACING.lg,
    },
    illustrationHalo: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: BORDER_RADIUS.full,
      backgroundColor: colors.surfaceTint,
      borderWidth: 1,
      borderColor: colors.borderVeryLight,
    },
    illustration: {
      width: ILLUSTRATION_SIZE,
      height: ILLUSTRATION_SIZE,
      resizeMode: "contain",
    },
    illustrationBadge: {
      position: "absolute",
      right: SPACING.sm,
      bottom: SPACING.sm,
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      borderColor: colors.screen,
      ...shadows.sm,
    },
    message: {
      color: colors.textBrand,
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.bold,
      textAlign: "center",
    },
    hint: {
      color: colors.textBrandMuted,
      fontSize: FONT_SIZE.sm,
      textAlign: "center",
      marginTop: SPACING.xs,
      lineHeight: 20,
      maxWidth: 260,
    },
  });
