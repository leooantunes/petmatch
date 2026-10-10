import { StyleSheet } from "react-native";
import {
  BORDER_RADIUS,
  COLORS,
  FONT_SIZE,
  SPACING,
} from "../../styles/colors";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
  },
  iconContainer: {
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.md,
    backgroundColor: COLORS.backgroundVeryLight,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.borderVeryLight,
  },
  message: {
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.md,
    textAlign: "center",
  },
});
