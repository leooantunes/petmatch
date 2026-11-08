import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { COLORS } from "../../styles/colors";
import { styles } from "./_backButton.styles";

export function BackButton() {
  const router = useRouter();

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
      <AntDesign name="left" size={18} color={COLORS.primaryDark} />
    </Pressable>
  );
}

export default BackButton;
