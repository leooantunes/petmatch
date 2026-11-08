import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const createProfileStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen,
    },
    content: {
      flex: 1,
      padding: SPACING.xl,
      paddingBottom: SPACING.xl,
    },
    description: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandMuted,
      textAlign: "center",
      marginBottom: SPACING.lg,
    },
    listContent: {
      paddingBottom: SPACING.xl + 120,
    },
    userSection: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.lg,
      marginBottom: SPACING.lg,
      ...shadows.md,
    },
    userAvatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      marginRight: SPACING.md,
      backgroundColor: colors.surfaceTint,
    },
    avatarOverlay: {
      position: "absolute",
      right: SPACING.md - 2,
      bottom: 0,
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.card,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.extraBold,
      color: colors.textBrand,
      marginBottom: SPACING.xs,
    },
    userEmail: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandMuted,
      marginBottom: SPACING.xs,
    },
    userLocation: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandSoft,
    },
    userActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: SPACING.sm,
      marginLeft: "auto",
    },
    ongsButton: {
      marginBottom: SPACING.lg,
      borderRadius: BORDER_RADIUS.full,
    },
    iconButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    iconButtonLogout: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.primaryDark,
      alignItems: "center",
      justifyContent: "center",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xl,
      padding: SPACING.xl,
      marginBottom: SPACING.lg,
      ...shadows.md,
    },
    cardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: SPACING.sm,
    },
    cardImage: {
      width: "100%",
      height: 180,
      borderRadius: BORDER_RADIUS.md,
      marginBottom: SPACING.md,
      backgroundColor: colors.surfaceTint,
    },
    cardName: {
      flex: 1,
      fontSize: FONT_SIZE.lg,
      fontWeight: FONT_WEIGHT.extraBold,
      color: colors.textBrand,
    },
    removeButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: BORDER_RADIUS.full,
      backgroundColor: colors.error,
    },
    cardInfoRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: SPACING.sm,
      marginBottom: SPACING.sm,
    },
    tag: {
      backgroundColor: colors.surfaceTint,
      paddingHorizontal: SPACING.sm,
      paddingVertical: 4,
      borderRadius: BORDER_RADIUS.full,
    },
    tagText: {
      color: colors.textBrandMuted,
      fontSize: FONT_SIZE.xs,
    },
    cardDescription: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandSoft,
      lineHeight: 20,
    },
  });
