import { AntDesign } from "@expo/vector-icons";
import { FirebaseError } from "@firebase/util";
import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { configureGoogleSignIn } from "../../config/socialAuthEnv";
import { db } from "@/firebase";
import { useLoading } from "../../components/loading/loading.component";
import { MODAL_BUTTON, MODAL_TITLE } from "../../components/modal/modalCopy";
import { FormField } from "../../components/formField/formField.component";
import ModernModal from "../../components/modal/modernModal";
import { COLORS } from "../../styles/colors";
import { UserCredentials } from "../../types/user";
import { styles } from "./_login.styles";

type ModalState = {
  visible: boolean;
  title: string;
  message: string;
  variant: "success" | "error" | "info" | "warning";
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
};

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const passwordRef = useRef<TextInput>(null);
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const { showLoading, hideLoading } = useLoading();
  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: "",
    message: "",
    variant: "info",
    confirmText: MODAL_BUTTON.ok,
    cancelText: MODAL_BUTTON.cancel,
    showCancelButton: false,
  });

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const showModal = (next: Omit<ModalState, "visible">) => {
    setModal({ ...next, visible: true });
  };

  const hideModal = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  const socialLoginFailed = useCallback(
    (fallbackMessage: string, error?: unknown) => {
      const firebaseErr = error as FirebaseError | undefined;
      showModal({
        title: MODAL_TITLE.error,
        message: firebaseErr?.message || fallbackMessage,
        variant: "error",
      });
    },
    [],
  );

  const onLogin = async () => {
    showLoading();
    try {
      console.log(
        "[LoginScreen] Attempting login with email:",
        credentials.email,
      );
      await auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
      console.log("[LoginScreen] Login successful, navigating to petList");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.push("/screens/petList/petList.screen");
    } catch (e: any) {
      const err = e as FirebaseError;
      console.error("[LoginScreen] Login error:", err);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showModal({
        title: MODAL_TITLE.error,
        message:
          err?.message ||
          "Nao foi possivel entrar. Verifique seu e-mail e senha e tente novamente.",
        variant: "error",
      });
    } finally {
      hideLoading();
    }
  };

  const onCreateAccount = () => {
    router.push("/screens/register/register.screen");
  };

  const createOrUpdateSocialProfile = useCallback(async () => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      throw new Error("Usuario nao autenticado.");
    }

    const userReference = db().collection("users").doc(currentUser.uid);
    const userSnapshot = await userReference.get();
    const profile = {
      uid: currentUser.uid,
      ...(currentUser.displayName ? { name: currentUser.displayName } : {}),
      ...(currentUser.email ? { email: currentUser.email } : {}),
      ...(currentUser.photoURL ? { photoUrl: currentUser.photoURL } : {}),
      ...(!userSnapshot.exists ? { createdAt: new Date() } : {}),
      updatedAt: new Date(),
    };

    await userReference.set(profile, { merge: true });
  }, []);

  const startGoogleLogin = useCallback(async () => {
    showLoading();
    try {
      if (Platform.OS === "android") {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      const response = await GoogleSignin.signIn();
      if (!isSuccessResponse(response)) {
        return;
      }

      const { idToken } = response.data;
      if (!idToken) {
        socialLoginFailed("Nao foi possivel obter token do Google.");
        return;
      }

      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
      await createOrUpdateSocialProfile();
      router.replace("/screens/petList/petList.screen");
    } catch (error) {
      socialLoginFailed("Nao foi possivel entrar com Google.", error);
    } finally {
      hideLoading();
    }
  }, [
    createOrUpdateSocialProfile,
    hideLoading,
    router,
    showLoading,
    socialLoginFailed,
  ]);

  const startAppleLogin = useCallback(async () => {
    if (Platform.OS !== "ios") {
      showModal({
        title: MODAL_TITLE.info,
        message: "Login com Apple disponivel apenas no iOS.",
        variant: "info",
      });
      return;
    }

    showLoading();
    try {
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!appleCredential.identityToken) {
        socialLoginFailed("Nao foi possivel obter token da Apple.");
        return;
      }

      const credential = auth.AppleAuthProvider.credential(
        appleCredential.identityToken,
      );
      await auth().signInWithCredential(credential);
      await createOrUpdateSocialProfile();
      router.replace("/screens/petList/petList.screen");
    } catch (error: any) {
      if (error?.code !== "ERR_REQUEST_CANCELED") {
        socialLoginFailed("Nao foi possivel entrar com Apple.", error);
      }
    } finally {
      hideLoading();
    }
  }, [
    hideLoading,
    router,
    showLoading,
    socialLoginFailed,
    createOrUpdateSocialProfile,
  ]);

  const onSocialLogin = async (provider: "google" | "apple") => {
    if (provider === "google") {
      await startGoogleLogin();
      return;
    }

    if (provider === "apple") {
      await startAppleLogin();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? undefined : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 16 },
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require("../../../assets/images/gato-cachorro-pixel-v3.png")}
          style={styles.logo}
          resizeMode="cover"
        />

        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Adoção responsável começa aqui.</Text>

        <FormField
          label="E-mail"
          placeholder="voce@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          value={credentials.email}
          onChangeText={(email) => setCredentials({ ...credentials, email })}
        />

        <FormField
          ref={passwordRef}
          label="Senha"
          placeholder="Sua senha"
          secureTextEntry
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={onLogin}
          value={credentials.password}
          onChangeText={(password) =>
            setCredentials({ ...credentials, password })
          }
        />

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
          onPress={onLogin}
        >
          <Text style={styles.primaryButtonText}>Entrar</Text>
        </Pressable>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.divider} />
        </View>

        {Platform.OS === "ios" && (
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={14}
            style={styles.appleButton}
            onPress={() => onSocialLogin("apple")}
          />
        )}

        <Pressable
          style={({ pressed }) => [
            styles.googleButton,
            pressed && styles.pressed,
          ]}
          onPress={() => onSocialLogin("google")}
        >
          <AntDesign name="google" size={18} color={COLORS.black} />
          <Text style={styles.googleButtonText}>Continuar com Google</Text>
        </Pressable>

        <View style={styles.spacer} />

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            pressed && styles.pressed,
          ]}
          onPress={onCreateAccount}
        >
          <Text style={styles.secondaryButtonText}>Criar uma conta</Text>
        </Pressable>
      </ScrollView>

      <ModernModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        variant={modal.variant}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        showCancelButton={modal.showCancelButton}
        onConfirm={modal.onConfirm}
        onClose={hideModal}
      />
    </KeyboardAvoidingView>
  );
}
