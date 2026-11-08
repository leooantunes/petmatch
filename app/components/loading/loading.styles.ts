import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import { FONT_WEIGHT, SPACING } from "../../styles/colors";

export const createLoadingStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: colors.overlay,
      alignItems: "center",
      justifyContent: "center",
    },
    loaderCard: {
      width: 180,
      padding: SPACING.lg,
      borderRadius: 20,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      ...shadows.lg,
    },
    pawWrapper: {
      alignItems: "center",
      justifyContent: "center",
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.surfaceTint,
      marginBottom: SPACING.sm,
    },
    loaderText: {
      marginTop: SPACING.sm,
      color: colors.textBrand,
      fontWeight: FONT_WEIGHT.bold,
    },
  });
