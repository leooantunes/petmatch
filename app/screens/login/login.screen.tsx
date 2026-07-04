import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FirebaseError } from "@firebase/util";
import auth from "@react-native-firebase/auth";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import { MODAL_BUTTON, MODAL_TITLE } from "../../components/modal/modalCopy";
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
      await auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
      router.push("/screens/petList/petList.screen");
    } catch (e: any) {
      const err = e as FirebaseError;
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
      router.replace("/screens/petList/petList.screen");
    } catch (error: any) {
      if (error?.code !== "ERR_REQUEST_CANCELED") {
        socialLoginFailed("Nao foi possivel entrar com Apple.", error);
      }
    } finally {
      hideLoading();
    }
  }, [hideLoading, router, showLoading, socialLoginFailed]);

  const onSocialLogin = async (provider: "google" | "facebook" | "apple") => {
    if (provider === "apple") {
      await startAppleLogin();
      return;
    }

    showModal({
      title: MODAL_TITLE.info,
      message:
        provider === "google"
          ? "Login com Google sera reativado quando a configuracao social estiver pronta."
          : "Login com Facebook sera reativado quando a configuracao social estiver pronta.",
      variant: "info",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoWrapper}>
          <View style={styles.illustrationWrapper}>
            <MaterialCommunityIcons
              name="dog"
              size={58}
              color={COLORS.primaryMedium}
              style={styles.dogIcon}
            />
            <MaterialCommunityIcons
              name="cat"
              size={50}
              color={COLORS.primaryDark}
              style={styles.catIcon}
            />
          </View>
        </View>

        <Text style={styles.title}>PetMatch</Text>
        <Text style={styles.subtitle}>Adoção responsável começa aqui</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b8d9bd"
          keyboardType="email-address"
          autoCapitalize="none"
          value={credentials.email}
          onChangeText={(email) => setCredentials({ ...credentials, email })}
          textContentType="emailAddress"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#b8d9bd"
          secureTextEntry
          value={credentials.password}
          onChangeText={(password) =>
            setCredentials({ ...credentials, password })
          }
          textContentType="password"
        />

        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.bottomInfo}>
          <Text style={styles.tip}>Ainda não tem conta?</Text>
          <TouchableOpacity onPress={onCreateAccount}>
            <Text style={styles.linkText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.containerSocial}>
          <TouchableOpacity
            style={[styles.socialButton, styles.socialGoogle]}
            onPress={() => onSocialLogin("google")}
          >
            <AntDesign style={styles.socialButtonText} name="google" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, styles.socialFacebook]}
            onPress={() => onSocialLogin("facebook")}
          >
            <FontAwesome style={styles.socialButtonText} name="facebook" />
          </TouchableOpacity>

          {Platform.OS === "ios" && (
            <TouchableOpacity
              style={[styles.socialButton, styles.socialApple]}
              onPress={() => onSocialLogin("apple")}
            >
              <AntDesign style={styles.socialButtonText} name="apple" />
            </TouchableOpacity>
          )}
        </View>
      </View>

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
    </View>
  );
}
