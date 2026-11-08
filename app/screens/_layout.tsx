import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "../hooks/useTheme";

export default function ScreensLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 280,
        gestureEnabled: true,
        contentStyle: { backgroundColor: colors.screen },
      }}
    >
      {/* Detail and form screens slide up like a sheet. */}
      <Stack.Screen
        name="pdpet/pdpet.screen"
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen
        name="editProfile/editProfile.screen"
        options={{ animation: "slide_from_bottom" }}
      />
      {/* Auth transitions fade instead of sliding. */}
      <Stack.Screen name="login/login.screen" options={{ animation: "fade" }} />
    </Stack>
  );
}
