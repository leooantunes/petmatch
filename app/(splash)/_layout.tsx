import { Stack } from 'expo-router';
import React from 'react';

export default function SplashLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
