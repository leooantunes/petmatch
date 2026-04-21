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
  containerSocial: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginVertical: 25,
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
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.md,
    marginBottom: SPACING.md,
    color: COLORS.primaryDarker,
    backgroundColor: COLORS.backgroundVeryLight,
  },
  loginButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  loginButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  tip: {
    color: COLORS.primaryMedium,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: FONT_WEIGHT.bold,
  },
  dividerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SPACING.md,
    gap: SPACING.md,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.borderVeryLight,
  },
  dividerText: {
    color: COLORS.primaryLight,
    fontWeight: FONT_WEIGHT.medium,
  },
  socialButton: {
    height: FONT_SIZE.xxl,
    width: FONT_SIZE.xxl,
    borderRadius: BORDER_RADIUS.xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  socialButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.sm,
  },
  socialGoogle: {
    backgroundColor: COLORS.primary,
  },
  socialFacebook: {
    backgroundColor: COLORS.primary,
  },
  socialApple: {
    backgroundColor: COLORS.primary,
  },
});

export default { styles };
