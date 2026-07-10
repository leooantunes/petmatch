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
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.extraBold,
    color: COLORS.primaryDark,
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    overflow: "hidden",
    marginBottom: SPACING.lg,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  cardBody: {
    padding: SPACING.lg,
  },
  petName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.extraBold,
    color: COLORS.primaryDark,
    marginBottom: SPACING.xs,
  },
  petDetails: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primaryDarker,
    marginBottom: SPACING.sm,
  },
  petInfoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  petInfoTag: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    marginBottom: SPACING.xs,
    color: COLORS.white,
    alignSelf: "flex-start",
    flexShrink: 0,
  },
  petInfoLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.white,
  },
  emptyText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primaryDark,
    textAlign: "center",
    marginTop: SPACING.xl,
  },
  petDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primaryLight,
    lineHeight: 20,
  },
});

export default { styles };
