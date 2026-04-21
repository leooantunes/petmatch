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
    paddingBottom: SPACING.xxl + 100,
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
    fontWeight: FONT_WEIGHT.medium,
    color: COLORS.primaryDarker,
    marginBottom: SPACING.xs,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZE.md,
    color: COLORS.primaryDarker,
    backgroundColor: COLORS.white,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  switchText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primaryDarker,
  },
  photoPreview: {
    width: "100%",
    height: 180,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.backgroundVeryLight,
    marginBottom: SPACING.md,
    justifyContent: "center",
    alignItems: "center",
  },
  photoPlaceholder: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primaryMedium,
  },
  photoImage: {
    width: "100%",
    height: "100%",
    borderRadius: BORDER_RADIUS.lg,
  },
  button: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.sm,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
    fontSize: FONT_SIZE.md,
  },
  textButton: {
    marginTop: SPACING.md,
    alignSelf: "center",
  },
  textButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default { styles };
