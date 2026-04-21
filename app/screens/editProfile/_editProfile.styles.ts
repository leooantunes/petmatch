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
  },
  scrollContent: {
    padding: SPACING.xl,
    marginTop: SPACING.lg,
  },
  header: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.extraBold,
    color: COLORS.primaryDark,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primaryMedium,
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primaryDarker,
    marginBottom: SPACING.xs,
    fontWeight: FONT_WEIGHT.medium,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZE.md,
    backgroundColor: COLORS.white,
    color: COLORS.primaryDarker,
  },
  button: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.md,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  cancelButton: {
    marginTop: SPACING.sm,
    alignItems: "center",
  },
  cancelText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default { styles };
