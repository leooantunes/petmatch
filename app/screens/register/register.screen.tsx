import { db } from "@/firebase";
import { FirebaseError } from "@firebase/util";
import auth from "@react-native-firebase/auth";
import * as Haptics from "expo-haptics";
import { Stack, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import { MODAL_BUTTON, MODAL_TITLE } from "../../components/modal/modalCopy";
import {
  formatBrazilianMobile,
  isValidBrazilianMobile,
  PHONE_ERROR_MESSAGE,
} from "@/utils/phone";
import { FormField } from "../../components/formField/formField.component";
import ModernModal from "../../components/modal/modernModal";
import { COLORS } from "../../styles/colors";
import { UserRegistration } from "../../types/user";
import { styles } from "./_register.styles";

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

export default function RegisterScreen() {
  const router = useRouter();
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [form, setForm] = useState<UserRegistration>({
    name: "",
    email: "",
    phone: "",
    city: "",
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

  const handleRegister = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.city ||
      !form.password
    ) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      showModal({
        title: MODAL_TITLE.warning,
        message: "Preencha todos os campos para criar sua conta.",
        variant: "warning",
      });
      return;
    }

    if (!isValidBrazilianMobile(form.phone)) {
      setPhoneTouched(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      showModal({
        title: MODAL_TITLE.warning,
        message: PHONE_ERROR_MESSAGE,
        variant: "warning",
      });
      return;
    }

    showLoading();
    try {
      const credential = await auth().createUserWithEmailAndPassword(
        form.email,
        form.password,
      );

      await db().collection("users").doc(credential.user.uid).set({
        uid: credential.user.uid,
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        createdAt: new Date(),
      });

      await credential.user.updateProfile({ displayName: form.name });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      showModal({
        title: MODAL_TITLE.success,
        message: "Sua conta foi criada com sucesso.",
        variant: "success",
        confirmText: MODAL_BUTTON.continue,
        onConfirm: () => router.replace("/screens/petList/petList.screen"),
      });
    } catch (e: any) {
      const err = e as FirebaseError;
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      showModal({
        title: MODAL_TITLE.error,
        message:
          err?.message ||
          "Nao foi possivel criar sua conta. Verifique os dados e tente novamente.",
        variant: "error",
      });
      console.error("Erro ao criar usuário:", err.message);
    } finally {
      hideLoading();
    }
  };

  const phoneError =
    phoneTouched && form.phone && !isValidBrazilianMobile(form.phone)
      ? PHONE_ERROR_MESSAGE
      : undefined;

  const focusNext = (next: React.RefObject<TextInput | null>) => () =>
    next.current?.focus();

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? undefined : "height"}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Criar conta",
          headerLargeTitle: true,
          headerBackTitle: "Entrar",
          headerTintColor: COLORS.primary,
          headerShadowVisible: false,
          headerLargeTitleShadowVisible: false,
          headerStyle: { backgroundColor: COLORS.white },
          headerTitleStyle: {
            fontFamily: "Inter_700Bold",
            color: COLORS.black,
          },
          headerLargeTitleStyle: {
            fontFamily: "Inter_800ExtraBold",
            color: COLORS.black,
          },
        }}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          Crie sua conta para encontrar um novo amigo.
        </Text>

        <FormField
          label="Nome"
          placeholder="Seu nome completo"
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={focusNext(emailRef)}
          value={form.name}
          onChangeText={(name) => setForm({ ...form, name })}
        />

        <FormField
          ref={emailRef}
          label="E-mail"
          placeholder="voce@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={focusNext(phoneRef)}
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
        />

        <FormField
          ref={phoneRef}
          label="Celular"
          placeholder="(31) 99999-9999"
          keyboardType="phone-pad"
          autoComplete="tel"
          textContentType="telephoneNumber"
          returnKeyType="next"
          submitBehavior="submit"
          maxLength={15}
          error={phoneError}
          onBlur={() => setPhoneTouched(true)}
          onSubmitEditing={focusNext(cityRef)}
          value={form.phone}
          onChangeText={(phone) =>
            setForm({ ...form, phone: formatBrazilianMobile(phone) })
          }
        />

        <FormField
          ref={cityRef}
          label="Cidade"
          placeholder="Ex.: Belo Horizonte"
          autoCapitalize="words"
          textContentType="addressCity"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={focusNext(passwordRef)}
          value={form.city}
          onChangeText={(city) => setForm({ ...form, city })}
        />

        <FormField
          ref={passwordRef}
          label="Senha"
          placeholder="Mínimo de 6 caracteres"
          secureTextEntry
          autoComplete="new-password"
          textContentType="newPassword"
          passwordRules="minlength: 6;"
          returnKeyType="done"
          onSubmitEditing={handleRegister}
          value={form.password}
          onChangeText={(password) => setForm({ ...form, password })}
        />

        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
          onPress={handleRegister}
        >
          <Text style={styles.primaryButtonText}>Criar conta</Text>
        </Pressable>

        <Text style={styles.helperText}>
          Seus dados são confidenciais e usados apenas para criar seu perfil.
        </Text>
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
