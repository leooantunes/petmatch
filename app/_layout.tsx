import { AntDesign } from "@expo/vector-icons";
import { Stack, useRouter, useSegments } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LoadingProvider } from "./components/loading/loading.component";
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING } from "./styles/colors";

export default function RootLayout() {
  const segments = useSegments() as string[];
  const router = useRouter();
  const hideNavbar =
    segments.includes("login") || segments.includes("register");

  const handleHome = () => router.push("/screens/petList/petList.screen");
  const handleAddPet = () => router.push("/screens/addPet/addPet.screen");
  const handleProfile = () => router.push("/screens/profile/profile.screen");

  return (
    <LoadingProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        {!hideNavbar && (
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.navButton} onPress={handleHome}>
              <AntDesign name="home" size={24} color={COLORS.primaryDark} />
              <Text style={styles.navButtonText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPlusButton}
              onPress={handleAddPet}
            >
              <AntDesign name="plus" size={28} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={handleProfile}>
              <AntDesign name="user" size={24} color={COLORS.primaryDark} />
              <Text style={styles.navButtonText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderVeryLight,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonText: {
    marginTop: SPACING.xs,
    color: COLORS.primaryDark,
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.bold,
  },
  navPlusButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
  },
});
