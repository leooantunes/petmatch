import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack, useRouter, useSegments } from "expo-router";
import React from "react";
import {
  StyleSheet,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { ErrorBoundary } from "./components/errorBoundary/errorBoundary.component";
import { LoadingProvider } from "./components/loading/loading.component";
import { NotificationProvider } from "./contexts/NotificationContext";
import { useNotificationSetup } from "./hooks/useNotificationSetup";
import { Theme, useTheme, useThemedStyles } from "./hooks/useTheme";
import { Icon } from "./components/icon/Icon";

type DefaultStyledComponent = {
  defaultProps?: {
    style?: StyleProp<TextStyle>;
  };
};

function setDefaultFont(component: DefaultStyledComponent) {
  component.defaultProps = {
    ...component.defaultProps,
    style: [{ fontFamily: "Inter_400Regular" }, component.defaultProps?.style],
  };
}

// React Native supports defaultProps at runtime, though it is absent from its current typings.
setDefaultFont(Text as typeof Text & DefaultStyledComponent);
setDefaultFont(TextInput as typeof TextInput & DefaultStyledComponent);

/**
 * Componente interno que usa o hook de notificações
 * Precisa estar dentro do NotificationProvider
 */
function RootLayoutContent() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const theme = useTheme();
  const { colors } = theme;
  const styles = useThemedStyles(createNavStyles);

  // Setup de notificações
  useNotificationSetup();
  const segments = useSegments() as string[];
  const router = useRouter();
  const currentRoute = segments.at(-1) ?? "";
  const hideNavbar =
    segments.includes("login") || segments.includes("register");
  const isHomeActive =
    currentRoute === "petList" ||
    currentRoute === "petList.screen" ||
    segments.includes("petList");
  const isAddPetActive =
    currentRoute === "addPet" ||
    currentRoute === "addPet.screen" ||
    segments.includes("addPet");
  const isProfileActive =
    currentRoute === "profile" ||
    currentRoute === "profile.screen" ||
    segments.includes("profile");

  const handleHome = () => router.push("/screens/petList/petList.screen");
  const handleAddPet = () => router.push("/screens/addPet/addPet.screen");
  const handleProfile = () => router.push("/screens/profile/profile.screen");

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <LoadingProvider>
        <>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              animationDuration: 280,
              gestureEnabled: true,
              contentStyle: { backgroundColor: colors.screen },
            }}
          />
          {!hideNavbar && (
            <View style={styles.navbar} accessibilityRole="tablist">
              <TouchableOpacity
                style={[
                  styles.navButton,
                  isHomeActive && styles.navButtonActive,
                ]}
                onPress={handleHome}
                accessibilityRole="tab"
                accessibilityLabel="Home"
                accessibilityState={{ selected: isHomeActive }}
              >
                <View
                  style={
                    isHomeActive
                      ? styles.navItemCircleActive
                      : styles.navItemCircleInactive
                  }
                >
                  <Icon family="antdesign"
                    name="home"
                    size={14}
                    color={isHomeActive ? colors.onPrimary : colors.textBrand}
                  />
                </View>
                <Text
                  style={[
                    styles.navButtonText,
                    isHomeActive && styles.navButtonTextActive,
                  ]}
                >
                  Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  isAddPetActive && styles.navButtonActive,
                ]}
                onPress={handleAddPet}
                accessibilityRole="tab"
                accessibilityLabel="Cadastrar novo pet"
                accessibilityState={{ selected: isAddPetActive }}
              >
                <View
                  style={
                    isAddPetActive
                      ? styles.navItemCircleActive
                      : styles.navItemCircleInactive
                  }
                >
                  <Icon family="antdesign"
                    name="plus"
                    size={14}
                    color={isAddPetActive ? colors.onPrimary : colors.textBrand}
                  />
                </View>
                <Text
                  style={[
                    styles.navButtonText,
                    isAddPetActive && styles.navButtonTextActive,
                  ]}
                >
                  New Pet
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.navButton,
                  isProfileActive && styles.navButtonActive,
                ]}
                onPress={handleProfile}
                accessibilityRole="tab"
                accessibilityLabel="Perfil"
                accessibilityState={{ selected: isProfileActive }}
              >
                <View
                  style={
                    isProfileActive
                      ? styles.navItemCircleActive
                      : styles.navItemCircleInactive
                  }
                >
                  <Icon family="antdesign"
                    name="user-switch"
                    size={14}
                    color={isProfileActive ? colors.onPrimary : colors.textBrand}
                  />
                </View>
                <Text
                  style={[
                    styles.navButtonText,
                    isProfileActive && styles.navButtonTextActive,
                  ]}
                >
                  Perfil
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      </LoadingProvider>
    </ErrorBoundary>
  );
}

const createNavStyles = ({ colors, shadows }: Theme) =>
  StyleSheet.create({
  navbar: {
    position: "absolute",
    left: 50,
    right: 50,
    bottom: 50,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 6,
    backgroundColor: colors.card,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderVeryLight,
    ...shadows.md,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 32,
    borderRadius: 999,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  navButtonActive: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  navItemCircleActive: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1,
  },
  navItemCircleInactive: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    marginTop: 1,
    color: colors.textBrand,
    fontSize: 10,
    fontFamily: "Inter_700Bold",
  },
  navButtonTextActive: {
    color: colors.onPrimary,
    fontFamily: "Inter_800ExtraBold",
  },
});

/**
 * Layout raiz da aplicação
 * Envolve tudo com NotificationProvider para gerenciar push notifications
 */
export default function RootLayout() {
  return (
    <NotificationProvider>
      <RootLayoutContent />
    </NotificationProvider>
  );
}
