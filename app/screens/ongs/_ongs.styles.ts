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
    marginTop: SPACING.lg,
  },
  listContent: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xl + 120,
  },
  header: {
    marginBottom: SPACING.lg,
  },
  backButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary,
  },
  title: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.extraBold,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.primaryMedium,
    fontSize: FONT_SIZE.sm,
    lineHeight: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: 96,
    height: 96,
    marginRight: SPACING.md,
  },
  cardContent: {
    flex: 1,
  },
  ongName: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.extraBold,
    marginBottom: SPACING.sm,
  },
  pixLabel: {
    color: COLORS.primaryMedium,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
  pixValue: {
    color: COLORS.primaryDarker,
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.md,
  },
  whatsappButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: "#25D366",
    borderRadius: BORDER_RADIUS.full,
  },
  whatsappButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.bold,
  },
});
