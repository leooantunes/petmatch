import { StyleSheet } from "react-native";
import { BORDER_RADIUS, COLORS, SPACING } from "../../styles/colors";

export const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.lg,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  pressed: {
    opacity: 0.6,
  },
});

export default { styles };
