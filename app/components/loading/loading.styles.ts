import { StyleSheet } from "react-native";
import { COLORS, FONT_WEIGHT, SPACING } from "../../styles/colors";

export const loadingStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderCard: {
    width: 180,
    padding: SPACING.lg,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 20,
  },
  pawWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.backgroundVeryLight,
    marginBottom: SPACING.sm,
  },
  loaderText: {
    marginTop: SPACING.sm,
    color: COLORS.primaryDark,
    fontWeight: FONT_WEIGHT.bold,
  },
});
