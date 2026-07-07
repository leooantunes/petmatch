import { db } from "@/firebase";
import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import {
  MODAL_BUTTON,
  MODAL_MESSAGE,
  MODAL_TITLE,
} from "../../components/modal/modalCopy";
import ModernModal from "../../components/modal/modernModal";
import { COLORS } from "../../styles/colors";
import { UserProfile } from "../../types/user";
import { styles } from "./_editProfile.styles";

const defaultProfileImage =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80";

const isLocalImageUri = (uri: string) =>
  uri.startsWith("file://") ||
  uri.startsWith("content://") ||
  uri.startsWith("ph://");

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

export default function EditProfileScreen() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    age: "",
    city: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const loadProfile = async () => {
      showLoading();
      const currentUser = auth().currentUser;
      if (!currentUser) {
        showModal({
          title: MODAL_TITLE.warning,
          message: MODAL_MESSAGE.sessionExpired,
          variant: "warning",
          onConfirm: () => router.replace("/screens/login/login.screen"),
        });
        hideLoading();
        return;
      }

      try {
        const snapshot = await db()
          .collection("users")
          .doc(currentUser.uid)
          .get();
        if (snapshot.exists) {
          const data = snapshot.data() as Record<string, any>;
          setProfile({
            name: data.name ?? currentUser.displayName ?? "",
            email: data.email ?? currentUser.email ?? "",
            phone: data.phone ?? "",
            age: data.age ?? "",
            city: data.city ?? "",
            password: "",
          });
          setProfileImage(
            data.photoUrl ?? currentUser.photoURL ?? defaultProfileImage,
          );
        } else {
          setProfile({
            name: currentUser.displayName ?? "",
            email: currentUser.email ?? "",
            phone: "",
            age: "",
            city: "",
            password: "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        showModal({
          title: MODAL_TITLE.error,
          message: "Nao foi possivel carregar seu perfil.",
          variant: "error",
        });
      } finally {
        setLoading(false);
        hideLoading();
      }
    };

    loadProfile();
  }, [hideLoading, router, showLoading]);

  const uploadProfileImage = async (localUri: string) => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      throw new Error("Usuário não autenticado");
    }

    const fileName = `profile_${currentUser.uid}_${Date.now()}.jpg`;
    const storageRef = storage().ref(`profilePhotos/${fileName}`);
    const normalizedUri =
      Platform.OS === "android" ? localUri : localUri.replace("file://", "");

    await storageRef.putFile(normalizedUri);
    return storageRef.getDownloadURL();
  };

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (
      !profile.name ||
      !profile.email ||
      !profile.phone ||
      !profile.age ||
      !profile.city
    ) {
      showModal({
        title: MODAL_TITLE.warning,
        message: "Por favor, preencha todos os campos obrigatórios.",
        variant: "warning",
      });
      return;
    }

    try {
      showLoading();
      const currentUser = auth().currentUser;
      if (!currentUser) {
        showModal({
          title: MODAL_TITLE.warning,
          message: MODAL_MESSAGE.sessionExpired,
          variant: "warning",
        });
        return;
      }

      let photoUrl = profileImage;
      if (isLocalImageUri(profileImage)) {
        photoUrl = await uploadProfileImage(profileImage);
      }

      await db().collection("users").doc(currentUser.uid).set(
        {
          uid: currentUser.uid,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          age: profile.age,
          city: profile.city,
          photoUrl,
          updatedAt: new Date(),
        },
        { merge: true },
      );

      showModal({
        title: MODAL_TITLE.success,
        message: "Seu perfil foi salvo no Firebase.",
        variant: "success",
        confirmText: MODAL_BUTTON.back,
        onConfirm: () => router.back(),
      });
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      showModal({
        title: MODAL_TITLE.error,
        message: "Nao foi possivel salvar seu perfil.",
        variant: "error",
      });
    } finally {
      hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Editar perfil</Text>
        <Text style={styles.subtitle}>
          Atualize suas informações de usuário para manter seu perfil sempre
          correto.
        </Text>

        <TouchableOpacity
          style={styles.photoSection}
          onPress={pickProfileImage}
        >
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
            onError={() => setProfileImage(defaultProfileImage)}
          />
          <View style={styles.photoOverlay}>
            <AntDesign name="camera" size={18} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <Text style={styles.photoHint}>Toque para trocar a foto de perfil</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#b8d9bd"
          value={profile.name}
          onChangeText={(name) => setProfile({ ...profile, name })}
          editable={!loading}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b8d9bd"
          value={profile.email}
          onChangeText={(email) => setProfile({ ...profile, email })}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <Text style={styles.label}>Celular</Text>
        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#b8d9bd"
          value={profile.phone}
          onChangeText={(phone) => setProfile({ ...profile, phone })}
          keyboardType="phone-pad"
          editable={!loading}
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          placeholder="Idade"
          placeholderTextColor="#b8d9bd"
          value={profile.age}
          onChangeText={(age) => setProfile({ ...profile, age })}
          keyboardType="numeric"
          editable={!loading}
        />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#b8d9bd"
          value={profile.city}
          onChangeText={(city) => setProfile({ ...profile, city })}
          editable={!loading}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#b8d9bd"
          secureTextEntry
          value={profile.password}
          onChangeText={(password) => setProfile({ ...profile, password })}
          editable={!loading}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
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
    </View>
  );
}
