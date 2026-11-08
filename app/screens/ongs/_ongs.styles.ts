import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const WHATSAPP_GREEN = "#25D366";

export const createOngsStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen,
    },
    listContent: {
      padding: SPACING.xl,
      paddingBottom: SPACING.xl + 120,
    },
    header: {
      marginBottom: SPACING.lg,
    },
    title: {
      color: colors.textBrand,
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.extraBold,
      marginBottom: SPACING.xs,
    },
    subtitle: {
      color: colors.textBrandMuted,
      fontSize: FONT_SIZE.sm,
      lineHeight: 20,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: SPACING.lg,
      padding: SPACING.lg,
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xl,
      ...shadows.md,
    },
    image: {
      width: 96,
      height: 96,
      marginRight: SPACING.md,
    },
    cardContent: {
      flex: 1,
    },
    ongName: {
      color: colors.textBrand,
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.extraBold,
      marginBottom: SPACING.sm,
    },
    pixLabel: {
      color: colors.textBrandMuted,
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.bold,
    },
    pixValue: {
      color: colors.textBrandStrong,
      fontSize: FONT_SIZE.sm,
      marginBottom: SPACING.md,
    },
    whatsappButton: {
      backgroundColor: WHATSAPP_GREEN,
      borderRadius: BORDER_RADIUS.full,
    },
    whatsappButtonText: {
      color: colors.onPrimary,
    },
  });
