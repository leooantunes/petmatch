import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const createAddPetStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen,
    },
    scrollContent: {
      padding: SPACING.xl,
      paddingTop: SPACING.sm,
      // Espaço para a tab bar flutuante.
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
      fontWeight: FONT_WEIGHT.medium,
      color: colors.textBrandStrong,
      marginBottom: SPACING.sm,
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
      color: colors.textBrand,
      fontWeight: FONT_WEIGHT.bold,
      backgroundColor: colors.card,
    },
    inputMultiline: {
      height: 100,
      paddingTop: SPACING.md,
      textAlignVertical: "top",
    },
    dropdownContainer: {
      marginBottom: SPACING.lg,
    },
    dropdownButton: {
      minHeight: 52,
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderRadius: BORDER_RADIUS.md,
      paddingHorizontal: SPACING.md,
      backgroundColor: colors.card,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dropdownButtonOpen: {
      borderColor: colors.primary,
    },
    dropdownButtonText: {
      flex: 1,
      color: colors.textBrand,
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.bold,
      marginRight: SPACING.sm,
    },
    dropdownPlaceholder: {
      color: colors.placeholder,
      fontWeight: FONT_WEIGHT.medium,
    },
    dropdownMenu: {
      marginTop: SPACING.xs,
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.card,
      overflow: "hidden",
      maxHeight: 220,
      ...shadows.md,
    },
    dropdownScroll: {
      maxHeight: 220,
    },
    dropdownItem: {
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderVeryLight,
    },
    dropdownItemSelected: {
      backgroundColor: colors.surfaceTint,
    },
    dropdownItemText: {
      color: colors.textBrand,
      fontSize: FONT_SIZE.md,
    },
    switchRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: SPACING.md,
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.lg,
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xl,
      borderWidth: 1,
      borderColor: colors.borderLight,
      ...shadows.sm,
    },
    switchRowActive: {
      borderColor: colors.primary,
      backgroundColor: colors.surfaceTint,
    },
    switchLabelBox: {
      flex: 1,
    },
    switchText: {
      fontSize: FONT_SIZE.md,
      color: colors.textBrandStrong,
      fontWeight: FONT_WEIGHT.bold,
    },
    switchHint: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandMuted,
      marginTop: 2,
    },
    switchTrack: {
      width: 50,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.borderLight,
      padding: 2,
      justifyContent: "center",
    },
    switchTrackActive: {
      backgroundColor: colors.primary,
      alignItems: "flex-end",
    },
    switchThumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.onPrimary,
    },
    switchThumbActive: {
      backgroundColor: colors.onPrimary,
    },
    photoUploadCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.xl,
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderStyle: "dashed",
      padding: SPACING.md,
      marginBottom: SPACING.md,
      ...shadows.sm,
    },
    photoUploadIconBox: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.surfaceTint,
      alignItems: "center",
      justifyContent: "center",
      marginRight: SPACING.sm,
    },
    photoUploadTextBox: {
      flex: 1,
    },
    photoUploadTitle: {
      fontSize: FONT_SIZE.md,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.textBrand,
    },
    photoUploadSubtitle: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandMuted,
      marginTop: 2,
    },
    photoPreview: {
      width: "100%",
      height: 180,
      borderRadius: BORDER_RADIUS.lg,
      backgroundColor: colors.surfaceTint,
      marginBottom: SPACING.md,
      justifyContent: "center",
      alignItems: "center",
    },
    photosGrid: {
      marginBottom: SPACING.md,
    },
    photosGridRow: {
      gap: SPACING.sm,
      marginBottom: SPACING.sm,
    },
    photoCard: {
      width: "48%",
      height: 120,
      borderRadius: BORDER_RADIUS.lg,
      overflow: "hidden",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.borderVeryLight,
    },
    photoPlaceholder: {
      fontSize: FONT_SIZE.sm,
      color: colors.textBrandMuted,
    },
    photoImage: {
      width: "100%",
      height: "100%",
      borderRadius: BORDER_RADIUS.lg,
    },
    button: {
      marginTop: SPACING.sm,
      borderRadius: BORDER_RADIUS.lg,
    },
  });
