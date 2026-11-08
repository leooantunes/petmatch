import { StyleSheet } from "react-native";
import { Theme } from "../../hooks/useTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "../../styles/colors";

export const createPendingPetsApprovalStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screen,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderVeryLight,
    },

    headerTitle: {
      fontSize: FONT_SIZE.lg,
      fontWeight: "600",
      color: colors.text,
    },

    badge: {
      backgroundColor: colors.primary,
      borderRadius: BORDER_RADIUS.lg,
      paddingHorizontal: SPACING.sm,
      paddingVertical: SPACING.xs,
      minWidth: 30,
      alignItems: "center",
    },

    badgeText: {
      color: colors.onPrimary,
      fontWeight: "600",
      fontSize: FONT_SIZE.xs,
    },

    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    emptyText: {
      marginTop: SPACING.lg,
      fontSize: FONT_SIZE.md,
      color: colors.textSecondary,
      textAlign: "center",
    },

    listContent: {
      padding: SPACING.md,
    },

    petCard: {
      flexDirection: "row",
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.lg,
      padding: SPACING.md,
      marginBottom: SPACING.md,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.borderVeryLight,
      ...shadows.sm,
    },

    petImage: {
      width: 80,
      height: 80,
      borderRadius: BORDER_RADIUS.sm,
      marginRight: SPACING.md,
      backgroundColor: colors.surfaceTint,
    },

    petInfo: {
      flex: 1,
    },

    petName: {
      fontSize: FONT_SIZE.md,
      fontWeight: "600",
      color: colors.text,
      marginBottom: SPACING.xs,
    },

    petDetails: {
      fontSize: FONT_SIZE.sm,
      color: colors.textSecondary,
      marginBottom: SPACING.xs,
    },

    petLocation: {
      fontSize: FONT_SIZE.xs,
      color: colors.primary,
      fontWeight: "500",
    },

    petDescription: {
      fontSize: FONT_SIZE.xs,
      color: colors.textSecondary,
      marginTop: SPACING.xs,
    },

    detailHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: SPACING.lg,
      paddingVertical: SPACING.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderVeryLight,
    },

    detailContent: {
      flex: 1,
    },

    detailContentInner: {
      paddingBottom: SPACING.xxxl,
    },

    detailImage: {
      width: "100%",
      height: 300,
      backgroundColor: colors.surfaceTint,
    },

    detailInfo: {
      padding: SPACING.lg,
    },

    detailName: {
      fontSize: FONT_SIZE.xl,
      fontWeight: "700",
      color: colors.text,
      marginBottom: SPACING.xs,
    },

    detailSubtitle: {
      fontSize: FONT_SIZE.md,
      color: colors.textSecondary,
      marginBottom: SPACING.sm,
    },

    detailLocation: {
      fontSize: FONT_SIZE.sm,
      color: colors.primary,
      fontWeight: "500",
      marginBottom: SPACING.lg,
    },

    divider: {
      height: 1,
      backgroundColor: colors.borderVeryLight,
      marginVertical: SPACING.lg,
    },

    label: {
      fontSize: FONT_SIZE.sm,
      fontWeight: "600",
      color: colors.text,
      marginBottom: SPACING.sm,
    },

    description: {
      fontSize: FONT_SIZE.sm,
      color: colors.textSecondary,
      lineHeight: 20,
    },

    reasonInput: {
      borderWidth: 1,
      borderColor: colors.borderLight,
      borderRadius: BORDER_RADIUS.sm,
      padding: SPACING.md,
      minHeight: 100,
      color: colors.text,
      backgroundColor: colors.card,
      textAlignVertical: "top",
      marginBottom: SPACING.xl,
    },

    actions: {
      flexDirection: "row",
      gap: SPACING.md,
      marginTop: SPACING.xxl,
    },

    actionItem: {
      flex: 1,
    },
  });
