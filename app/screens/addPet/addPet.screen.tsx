import { db } from "@/firebase";
import { AntDesign } from "@expo/vector-icons";
import { FirebaseError } from "@firebase/util";
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
import { MODAL_BUTTON, MODAL_TITLE } from "../../components/modal/modalCopy";
import ModernModal from "../../components/modal/modernModal";
import { COLORS } from "../../styles/colors";
import { styles } from "./_addPet.styles";

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

export default function AddPetScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [neutered, setNeutered] = useState(false);
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<
    boolean | null
  >(null);
  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: "",
    message: "",
    variant: "info",
    confirmText: MODAL_BUTTON.ok,
    cancelText: MODAL_BUTTON.cancel,
    showCancelButton: false,
  });
  const { showLoading, hideLoading } = useLoading();

  const showModal = (next: Omit<ModalState, "visible">) => {
    setModal({ ...next, visible: true });
  };

  const hideModal = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  const removeBrokenPhoto = (uriToRemove: string) => {
    setPhotoUrls((prev) => prev.filter((item) => item !== uriToRemove));
  };

  const pickImages = async () => {
    if (hasGalleryPermission === false) {
      showModal({
        title: MODAL_TITLE.warning,
        message: "Autorize o acesso à galeria para selecionar fotos.",
        variant: "warning",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedUris = result.assets
        .map((asset) => asset.uri)
        .filter((uri): uri is string => Boolean(uri));

      setPhotoUrls((prev) => [...prev, ...selectedUris]);
    }
  };

  const uploadPetPhoto = async (localUri: string): Promise<string> => {
    const uniqueId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`;
    const filename = `pet_${uniqueId}`;
    const storageRef = storage().ref(`petPhotos/${filename}`);
    const normalizedUri =
      Platform.OS === "android" ? localUri : localUri.replace("file://", "");

    try {
      // Verificar se o usuário está autenticado
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }

      await storageRef.putFile(normalizedUri);
      return await storageRef.getDownloadURL();
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      if (error.code === "storage/unauthorized") {
        throw new Error(
          "Erro de permissão no Storage. Verifique as configurações de segurança do Firebase.",
        );
      }
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === "granted");
    })();
  }, []);

  const handleSubmit = async () => {
    showLoading();
    try {
      let uploadedPhotoUrls: string[] = [];

      if (photoUrls.length > 0) {
        const uploadResults = await Promise.allSettled(
          photoUrls.map((photoUrl) => uploadPetPhoto(photoUrl)),
        );

        uploadedPhotoUrls = uploadResults
          .filter(
            (uploadResult): uploadResult is PromiseFulfilledResult<string> =>
              uploadResult.status === "fulfilled",
          )
          .map((uploadResult) => uploadResult.value);
      }

      if (uploadedPhotoUrls.length === 0) {
        showModal({
          title: MODAL_TITLE.warning,
          message: "Selecione pelo menos uma foto para cadastrar o pet.",
          variant: "warning",
        });
        return;
      }

      await db()
        .collection("pets")
        .add({
          name,
          age,
          breed,
          neutered,
          location: city,
          description,
          image: uploadedPhotoUrls[0],
          images: uploadedPhotoUrls,
          ownerId: auth().currentUser?.uid ?? null,
          createdAt: new Date(),
        });

      showModal({
        title: MODAL_TITLE.success,
        message: "Seu anuncio foi publicado com sucesso.",
        variant: "success",
        confirmText: MODAL_BUTTON.viewList,
        onConfirm: () => router.push("/screens/petList/petList.screen"),
      });
    } catch (e: any) {
      const err = e as FirebaseError;
      showModal({
        title: MODAL_TITLE.error,
        message:
          err?.message || "Nao foi possivel cadastrar o pet. Tente novamente.",
        variant: "error",
      });
      console.log("Erro ao criar pet:", err.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Cadastrar novo pet</Text>
        <Text style={styles.subtitle}>
          Preencha os detalhes abaixo para anunciar um novo amigo.
        </Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do pet"
          placeholderTextColor="#b8d9bd"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          placeholder="Idade do pet"
          placeholderTextColor="#b8d9bd"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Raça</Text>
        <TextInput
          style={styles.input}
          placeholder="Raça do pet"
          placeholderTextColor="#b8d9bd"
          value={breed}
          onChangeText={setBreed}
        />

        <TouchableOpacity
          style={[styles.switchRow, neutered && styles.switchRowActive]}
          onPress={() => setNeutered((value) => !value)}
          activeOpacity={0.9}
        >
          <View style={styles.switchLabelBox}>
            <Text style={styles.switchText}>Castrado</Text>
            <Text style={styles.switchHint}>{neutered ? "Sim" : "Não"}</Text>
          </View>
          <View
            style={[styles.switchTrack, neutered && styles.switchTrackActive]}
          >
            <View
              style={[styles.switchThumb, neutered && styles.switchThumbActive]}
            />
          </View>
        </TouchableOpacity>

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#b8d9bd"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Descrição breve</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Conte um pouco sobre o pet"
          placeholderTextColor="#b8d9bd"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Fotos do pet</Text>
        <TouchableOpacity style={styles.photoUploadCard} onPress={pickImages}>
          <View style={styles.photoUploadIconBox}>
            <AntDesign name="picture" size={24} color={COLORS.primary} />
          </View>
          <View style={styles.photoUploadTextBox}>
            <Text style={styles.photoUploadTitle}>
              {photoUrls.length > 0
                ? `${photoUrls.length} foto(s) adicionada(s)`
                : "Adicionar fotos do pet"}
            </Text>
            <Text style={styles.photoUploadSubtitle}>
              Toque para selecionar imagens da galeria
            </Text>
          </View>
        </TouchableOpacity>

        {photoUrls.length > 0 ? (
          <View style={styles.photosGrid}>
            {photoUrls.map((uri, index) => (
              <View key={`${uri}-${index}`} style={styles.photoCard}>
                <Image
                  source={{ uri }}
                  style={styles.photoImage}
                  onError={() => removeBrokenPhoto(uri)}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.photoPreview}>
            <Text style={styles.photoPlaceholder}>
              Preview das fotos aparecerá aqui
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar pet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.textButton}
          onPress={() => router.back()}
        >
          <Text style={styles.textButtonText}>Cancelar</Text>
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