import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { useThemedStyles } from "../../hooks/useTheme";
import { createBackButtonStyles } from "./_backButton.styles";
import { Icon } from "../icon/Icon";

export function BackButton() {
  const router = useRouter();
  const styles = useThemedStyles(createBackButtonStyles);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    router.replace("/screens/petList/petList.screen");
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={handleBack}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Voltar"
    >
      <Icon family="antdesign" name="left" size={18} color="textBrand" />
    </Pressable>
  );
}

export default BackButton;
