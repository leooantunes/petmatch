import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import { FONT_SIZE, SPACING } from "../../styles/colors";

export const createRegisterStyles = ({ colors }: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: SPACING.lg,
      paddingBottom: SPACING.xxl * 2,
    },
    logoWrapper: {
      alignItems: "center",
      marginBottom: SPACING.xl,
    },
    logo: {
      width: 60,
      height: 60,
      resizeMode: "contain",
    },
    subtitle: {
      fontSize: FONT_SIZE.md,
      color: colors.textSecondary,
      marginBottom: SPACING.xxl,
    },
    primaryButton: {
      marginTop: SPACING.sm,
    },
    helperText: {
      color: colors.textSecondary,
      fontSize: 13,
      textAlign: "center",
      marginTop: SPACING.lg,
      lineHeight: 18,
    },
  });
