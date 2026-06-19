import { StyleSheet } from "react-native";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xxl,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    color: COLORS.primaryDark,
    fontWeight: FONT_WEIGHT.extraBold,
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primaryLight,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.md,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.bold,
    backgroundColor: COLORS.backgroundVeryLight,
  },
  buttonPrimary: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  buttonPrimaryText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
  },
  helperText: {
    color: COLORS.primaryMedium,
    fontSize: FONT_SIZE.sm,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  fieldRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.md,
  },
  halfInput: {
    flex: 1,
  },
  footerText: {
    color: COLORS.primaryMedium,
    textAlign: "center",
    marginTop: SPACING.md,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default { styles };
