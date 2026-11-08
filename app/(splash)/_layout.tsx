import { Stack } from 'expo-router';

export default function SplashLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
