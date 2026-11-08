import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const createPetListStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen,
    },
    listContent: {
      flexGrow: 1,
      padding: SPACING.xl,
      paddingBottom: SPACING.xl + 120,
    },
    emptyState: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    header: {
      fontSize: FONT_SIZE.xl,
      fontWeight: FONT_WEIGHT.extraBold,
      color: colors.textBrand,
      marginBottom: SPACING.lg,
      paddingHorizontal: SPACING.xl,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xl,
      overflow: "hidden",
      marginBottom: SPACING.lg,
      ...shadows.md,
    },
    cardImage: {
      width: "100%",
      height: 180,
      backgroundColor: colors.surfaceTint,
    },
    cardBody: {
      padding: SPACING.xl,
    },
    petName: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.extraBold,
      color: colors.textBrand,
      marginBottom: SPACING.sm,
    },
    petInfoRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      gap: SPACING.sm,
      marginBottom: SPACING.sm,
    },
    petInfoTag: {
      backgroundColor: colors.primary,
      borderRadius: BORDER_RADIUS.full,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      overflow: "hidden",
      color: colors.onPrimary,
      fontSize: FONT_SIZE.xs,
      fontWeight: FONT_WEIGHT.medium,
    },
    petDescription: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandSoft,
      lineHeight: 20,
    },
  });
