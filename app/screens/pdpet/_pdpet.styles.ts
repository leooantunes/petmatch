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
    paddingBottom: SPACING.xl + 120,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  imageCarouselContainer: {
    marginBottom: SPACING.lg,
  },
  petImage: {
    width: "100%",
    height: 280,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.backgroundVeryLight,
  },
  carouselDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.sm,
    gap: SPACING.xs,
  },
  carouselDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.borderLight,
  },
  carouselDotActive: {
    width: 20,
    backgroundColor: COLORS.primary,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  petName: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.extraBold,
    color: COLORS.primaryDark,
  },
  petBreed: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primaryMedium,
    marginTop: SPACING.xs,
  },
  statusBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.lg,
  },
  statusBadgeText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.bold,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  tag: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  tagText: {
    color: COLORS.primaryDark,
    fontWeight: FONT_WEIGHT.bold,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.primaryDark,
    fontWeight: FONT_WEIGHT.extraBold,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primaryDarker,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  profileItem: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  profileLabel: {
    color: COLORS.primaryMedium,
    fontSize: FONT_SIZE.sm,
    marginBottom: SPACING.xs,
  },
  profileValue: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
  adoptButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.lg,
  },
  adoptButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default { styles };
