import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const createModalStyles = ({ colors, shadows, isDark }: Theme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.overlay,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: SPACING.xl,
    },
    card: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.xl,
      alignItems: "center",
      ...shadows.lg,
    },
    iconContainer: {
      width: 58,
      height: 58,
      borderRadius: 29,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: SPACING.md,
    },
    successIcon: {
      backgroundColor: isDark ? "rgba(34, 197, 94, 0.16)" : "#E7F9EF",
    },
    errorIcon: {
      backgroundColor: isDark ? "rgba(239, 68, 68, 0.16)" : "#FCECEC",
    },
    infoIcon: {
      backgroundColor: isDark ? "rgba(75, 128, 87, 0.22)" : "#EAF3FF",
    },
    warningIcon: {
      backgroundColor: isDark ? "rgba(245, 158, 11, 0.16)" : "#FFF7E8",
    },
    title: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.extraBold,
      color: colors.textBrand,
      textAlign: "center",
      marginBottom: SPACING.xs,
    },
    message: {
      fontSize: FONT_SIZE.md,
      color: colors.textBrandMuted,
      textAlign: "center",
      lineHeight: 22,
      marginBottom: SPACING.lg,
    },
    actions: {
      flexDirection: "row",
      width: "100%",
      gap: SPACING.sm,
    },
    actionItem: {
      flex: 1,
    },
  });
