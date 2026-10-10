import React, { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./_formField.styles";

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
};

export const FormField = forwardRef<TextInput, FormFieldProps>(
  function FormField({ label, error, style, ...inputProps }, ref) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[styles.input, error && styles.inputError, style]}
          placeholderTextColor="#a1a1a6"
          selectionColor="#198a4d"
          clearButtonMode="while-editing"
          {...inputProps}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  },
);

export default FormField;
