import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, SPACING } from "../../styles/colors";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: 34,
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.black,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    marginBottom: SPACING.xxl + SPACING.sm,
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginVertical: SPACING.xxl,
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.separator,
  },
  dividerText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZE.sm,
  },
  appleButton: {
    height: 52,
    marginBottom: SPACING.md,
  },
  googleButton: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.separator,
    backgroundColor: COLORS.white,
  },
  googleButtonText: {
    color: COLORS.black,
    fontFamily: "Inter_700Bold",
    fontSize: FONT_SIZE.md + 1,
  },
  spacer: {
    flex: 1,
    minHeight: SPACING.xxl,
  },
  secondaryButton: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundLight,
  },
  secondaryButtonText: {
    color: COLORS.primaryDark,
    fontFamily: "Inter_700Bold",
    fontSize: FONT_SIZE.md + 1,
  },
});

export default { styles };
