import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import { FONT_SIZE, SPACING } from "../../styles/colors";

export const createFormFieldStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    field: {
      marginBottom: SPACING.lg,
    },
    label: {
      fontSize: 13,
      fontFamily: "Inter_700Bold",
      color: colors.textSecondary,
      marginBottom: 6,
      marginLeft: SPACING.xs,
    },
    input: {
      height: 50,
      borderRadius: 12,
      paddingHorizontal: SPACING.lg,
      fontSize: FONT_SIZE.md + 1,
      color: colors.text,
      backgroundColor: colors.field,
    },
    inputError: {
      borderWidth: 1,
      borderColor: colors.error,
    },
    error: {
      fontSize: 13,
      color: colors.error,
      marginTop: 6,
      marginLeft: SPACING.xs,
    },
  });
