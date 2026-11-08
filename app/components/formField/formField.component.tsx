import React, { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { useTheme, useThemedStyles } from "../../hooks/useTheme";
import { createFormFieldStyles } from "./_formField.styles";

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export const FormField = forwardRef<TextInput, FormFieldProps>(
  function FormField({ label, error, style, ...inputProps }, ref) {
    const theme = useTheme();
    const styles = useThemedStyles(createFormFieldStyles);

    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor={theme.colors.textTertiary}
          selectionColor={theme.colors.primary}
          keyboardAppearance={theme.isDark ? "dark" : "light"}
          clearButtonMode="while-editing"
          accessibilityLabel={label}
          accessibilityHint={error}
          {...inputProps}
        />
        {error ? (
          <Text style={styles.error} accessibilityLiveRegion="polite">
            {error}
          </Text>
        ) : null}
      </View>
    );
  },
);

export default FormField;
