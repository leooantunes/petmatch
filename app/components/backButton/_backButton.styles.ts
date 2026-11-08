import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import { BORDER_RADIUS, SPACING } from "../../styles/colors";

export const createBackButtonStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    button: {
      width: 40,
      height: 40,
      borderRadius: BORDER_RADIUS.full,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: SPACING.lg,
      ...shadows.sm,
    },
    pressed: {
      opacity: 0.6,
    },
  });
