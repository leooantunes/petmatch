import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, SPACING } from "../../styles/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl * 2,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xxl,
  },
  primaryButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontFamily: "Inter_700Bold",
    fontSize: FONT_SIZE.md + 1,
  },
  pressed: {
    opacity: 0.7,
  },
  helperText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: "center",
    marginTop: SPACING.lg,
    lineHeight: 18,
  },
});

export default { styles };
