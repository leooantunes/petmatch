import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE, SPACING } from "../../styles/colors";

export const styles = StyleSheet.create({
  field: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter_700Bold",
    color: COLORS.textSecondary,
    marginBottom: 6,
    marginLeft: SPACING.xs,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: SPACING.lg,
    fontSize: FONT_SIZE.md + 1,
    color: COLORS.black,
    backgroundColor: COLORS.fieldBackground,
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  error: {
    fontSize: 13,
    color: COLORS.danger,
    marginTop: 6,
    marginLeft: SPACING.xs,
  },
});

export default { styles };
