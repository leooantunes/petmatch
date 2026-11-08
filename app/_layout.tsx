import { AntDesign } from "@expo/vector-icons";
import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";
import { Stack, useRouter, useSegments } from "expo-router";
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
import { COLORS } from "./styles/colors";

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

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
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
          <Stack screenOptions={{ headerShown: false }} />
          {!hideNavbar && (
            <View style={styles.navbar}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  isHomeActive && styles.navButtonActive,
                ]}
                onPress={handleHome}
              >
                <View
                  style={
                    isHomeActive
                      ? styles.navItemCircleActive
                      : styles.navItemCircleInactive
                  }
                >
                  <AntDesign
                    name="home"
                    size={14}
                    color={isHomeActive ? COLORS.white : COLORS.primaryDark}
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
              >
                <View
                  style={
                    isAddPetActive
                      ? styles.navItemCircleActive
                      : styles.navItemCircleInactive
                  }
                >
                  <AntDesign
                    name="plus"
                    size={14}
                    color={isAddPetActive ? COLORS.white : COLORS.primaryDark}
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
              >
                <View
                  style={
                    isProfileActive
                      ? styles.navItemCircleActive
                      : styles.navItemCircleInactive
                  }
                >
                  <AntDesign
                    name="user-switch"
                    size={14}
                    color={isProfileActive ? COLORS.white : COLORS.primaryDark}
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

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.borderVeryLight,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
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
    backgroundColor: COLORS.primary,
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
    color: COLORS.primaryDark,
    fontSize: 10,
    fontFamily: "Inter_700Bold",
  },
  navButtonTextActive: {
    color: COLORS.white,
    fontFamily: "Inter_800ExtraBold",
  },
});
