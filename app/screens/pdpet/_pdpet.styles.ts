import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const createPdpetStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen,
    },
    scrollContent: {
      padding: SPACING.xl,
      paddingTop: SPACING.sm,
      paddingBottom: SPACING.xl + 120,
    },
    imageCarouselContainer: {
      marginBottom: SPACING.lg,
    },
    petImage: {
      width: "100%",
      height: 280,
      borderRadius: BORDER_RADIUS.xl,
      backgroundColor: colors.surfaceTint,
    },
    carouselDots: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: SPACING.sm,
      gap: SPACING.xs,
    },
    carouselDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.borderLight,
    },
    carouselDotActive: {
      width: 20,
      backgroundColor: colors.primary,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: SPACING.md,
      marginBottom: SPACING.md,
    },
    headerText: {
      flex: 1,
    },
    petName: {
      fontSize: FONT_SIZE.xxl,
      fontWeight: FONT_WEIGHT.extraBold,
      color: colors.textBrand,
    },
    petBreed: {
      fontSize: FONT_SIZE.md,
      color: colors.textBrandMuted,
      marginTop: SPACING.xs,
    },
    statusBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.xs,
      borderRadius: BORDER_RADIUS.lg,
    },
    statusBadgeText: {
      color: colors.onPrimary,
      fontWeight: FONT_WEIGHT.bold,
    },
    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: SPACING.sm,
      marginBottom: SPACING.lg,
    },
    tag: {
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.lg,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.xs,
      borderWidth: 1,
      borderColor: colors.borderLight,
    },
    tagText: {
      color: colors.textBrand,
      fontWeight: FONT_WEIGHT.bold,
    },
    sectionTitle: {
      fontSize: FONT_SIZE.lg,
      color: colors.textBrand,
      fontWeight: FONT_WEIGHT.extraBold,
      marginBottom: SPACING.sm,
    },
    description: {
      fontSize: FONT_SIZE.md,
      color: colors.textBrandStrong,
      lineHeight: 24,
      marginBottom: SPACING.lg,
    },
    profileRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: SPACING.lg,
      marginBottom: SPACING.lg,
    },
    profileItem: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.md,
      borderWidth: 1,
      borderColor: colors.borderVeryLight,
      ...shadows.sm,
    },
    profileLabel: {
      color: colors.textBrandMuted,
      fontSize: FONT_SIZE.sm,
      marginBottom: SPACING.xs,
    },
    profileValue: {
      color: colors.textBrand,
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.bold,
    },
    adoptButton: {
      marginTop: SPACING.lg,
      borderRadius: BORDER_RADIUS.xl,
    },
  });
