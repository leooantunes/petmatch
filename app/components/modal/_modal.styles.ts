import { StyleSheet } from "react-native";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  SPACING,
} from "../../styles/colors";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: "center",
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
  },
  successIcon: {
    backgroundColor: "#E7F9EF",
  },
  errorIcon: {
    backgroundColor: "#FCECEC",
  },
  infoIcon: {
    backgroundColor: "#EAF3FF",
  },
  warningIcon: {
    backgroundColor: "#FFF7E8",
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.extraBold,
    color: COLORS.primaryDark,
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  message: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primaryMedium,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    gap: SPACING.sm,
  },
  button: {
    flex: 1,
    height: 46,
    borderRadius: BORDER_RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButton: {
    backgroundColor: COLORS.backgroundVeryLight,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  cancelText: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default { styles };
