import { db } from "@/firebase";
import { FirebaseError } from "@firebase/util";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import { MODAL_BUTTON, MODAL_TITLE } from "../../components/modal/modalCopy";
import ModernModal from "../../components/modal/modernModal";
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
      showModal({
        title: MODAL_TITLE.warning,
        message: "Preencha todos os campos para criar sua conta.",
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
      showModal({
        title: MODAL_TITLE.success,
        message: "Sua conta foi criada com sucesso.",
        variant: "success",
        confirmText: MODAL_BUTTON.continue,
        onConfirm: () => router.replace("/screens/petList/petList.screen"),
      });
    } catch (e: any) {
      const err = e as FirebaseError;
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastre-se</Text>
        <Text style={styles.subtitle}>
          Crie sua conta para encontrar um novo amigo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#b8d9bd"
          value={form.name}
          onChangeText={(name) => setForm({ ...form, name })}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b8d9bd"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
          textContentType="emailAddress"
        />

        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#b8d9bd"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(phone) => setForm({ ...form, phone })}
          textContentType="telephoneNumber"
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#b8d9bd"
          value={form.city}
          onChangeText={(city) => setForm({ ...form, city })}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#b8d9bd"
          secureTextEntry
          value={form.password}
          onChangeText={(password) => setForm({ ...form, password })}
          textContentType="password"
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
          <Text style={styles.buttonPrimaryText}>Criar conta</Text>
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Seus dados são confidenciais e usados apenas para criar seu perfil.
        </Text>

        <Text style={styles.footerText}>
          Já tem conta? <Text style={styles.linkText}>Entrar</Text>
        </Text>
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
    </ScrollView>
  );
}