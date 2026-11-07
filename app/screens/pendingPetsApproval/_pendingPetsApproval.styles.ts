import { StyleSheet } from "react-native";
import { COLORS } from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundVeryLight,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderVeryLight,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.black,
  },

  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 30,
    alignItems: "center",
  },

  badgeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  listContent: {
    padding: 12,
  },

  petCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.borderVeryLight,
  },

  petImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },

  petInfo: {
    flex: 1,
  },

  petName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 4,
  },

  petDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  petLocation: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "500",
  },

  petDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderVeryLight,
  },

  detailContent: {
    flex: 1,
  },

  detailContentInner: {
    paddingBottom: 32,
  },

  detailImage: {
    width: "100%",
    height: 300,
    backgroundColor: COLORS.backgroundLight,
  },

  detailInfo: {
    padding: 16,
  },

  detailName: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.black,
    marginBottom: 4,
  },

  detailSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },

  detailLocation: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "500",
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.borderVeryLight,
    marginVertical: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  reasonInput: {
    borderWidth: 1,
    borderColor: COLORS.borderVeryLight,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    color: COLORS.black,
    textAlignVertical: "top",
    marginBottom: 20,
    fontFamily: "System",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },

  rejectButton: {
    backgroundColor: "#e74c3c",
  },

  approveButton: {
    backgroundColor: COLORS.primary,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
