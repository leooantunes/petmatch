import { db } from "@/firebase";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { EmptyList } from "../../components/emptyList/emptyList.component";
import { useLoading } from "../../components/loading/loading.component";
import {
  MODAL_BUTTON,
  MODAL_MESSAGE,
  MODAL_TITLE,
} from "../../components/modal/modalCopy";
import ModernModal from "../../components/modal/modernModal";
import { AnimatedButton } from "../../components/buttons/AnimatedButton";
import { AnimatedCard } from "../../components/cards/AnimatedCard";
import { useImageFallback } from "../../hooks/useImageFallback";
import { useTheme, useThemedStyles } from "../../hooks/useTheme";
import { Icon } from "../../components/icon/Icon";
import { Pet } from "../../types/pets";
import { createProfileStyles } from "./_profile.styles";

const defaultProfileImage =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80";

const mapPetImages = (rawImages: unknown): string[] => {
  if (!Array.isArray(rawImages)) {
    return [];
  }

  return rawImages.filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0,
  );
};

function PetCardImage({ uri, style }: Readonly<{ uri?: string; style?: any }>) {
  const { imageUri, handleError } = useImageFallback(uri, defaultProfileImage);

  return (
    <Image
      source={{ uri: imageUri }}
      style={style}
      onError={handleError}
    />
  );
}

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

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useThemedStyles(createProfileStyles);
  const { showLoading, hideLoading } = useLoading();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);
  const [userName, setUserName] = useState("Carregando...");
  const [userEmail, setUserEmail] = useState("");
  const [userCity, setUserCity] = useState("");
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
    const loadProfileData = async () => {
      setLoadingPets(true);
      showLoading();
      const currentUser = auth().currentUser;
      if (!currentUser) {
        setLoadingPets(false);
        hideLoading();
        return;
      }

      try {
        const profileSnapshot = await db()
          .collection("users")
          .doc(currentUser.uid)
          .get();
        if (profileSnapshot.exists()) {
          const data = profileSnapshot.data() as Record<string, any>;
          setUserName(data.name ?? currentUser.displayName ?? "Usuário");
          setUserEmail(data.email ?? currentUser.email ?? "");
          setUserCity(data.city ?? "");
          setProfileImage(
            data.photoUrl ?? currentUser.photoURL ?? defaultProfileImage,
          );
        }

        const snapshot = await db()
          .collection("pets")
          .where("ownerId", "==", currentUser.uid)
          .get();
        const loadedPets: Pet[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data() as Record<string, any>;
          const rawImages = data.images ?? data.photoUrls ?? data.photos ?? [];
          const mappedImages = mapPetImages(rawImages);
          return {
            id: docSnap.id,
            name: data.name ?? "",
            age: data.age ?? "",
            breed: data.breed ?? "",
            location: data.location ?? data.city ?? "",
            description: data.description ?? "",
            image: data.image ?? data.photoUrl ?? "",
            images: mappedImages,
            neutered: data.neutered ?? false,
          };
        });
        setPets(loadedPets);
      } catch (error) {
        console.error("Erro ao carregar perfil e pets:", error);
        showModal({
          title: MODAL_TITLE.error,
          message: "Nao foi possivel carregar seus dados no momento.",
          variant: "error",
        });
      } finally {
        setLoadingPets(false);
        hideLoading();
      }
    };

    loadProfileData();
  }, [hideLoading, showLoading]);

  useFocusEffect(
    React.useCallback(() => {
      setLoadingPets(true);
      const loadProfileData = async () => {
        const currentUser = auth().currentUser;
        if (!currentUser) {
          setLoadingPets(false);
          return;
        }

        try {
          const profileSnapshot = await db()
            .collection("users")
            .doc(currentUser.uid)
            .get();
          if (profileSnapshot.exists()) {
            const data = profileSnapshot.data() as Record<string, any>;
            setUserName(data.name ?? currentUser.displayName ?? "Usuário");
            setUserEmail(data.email ?? currentUser.email ?? "");
            setUserCity(data.city ?? "");
            setProfileImage(
              data.photoUrl ?? currentUser.photoURL ?? defaultProfileImage,
            );
          }

          const snapshot = await db()
            .collection("pets")
            .where("ownerId", "==", currentUser.uid)
            .get();
          const loadedPets: Pet[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data() as Record<string, any>;
            const rawImages = data.images ?? data.photoUrls ?? data.photos ?? [];
            const mappedImages = mapPetImages(rawImages);
            return {
              id: docSnap.id,
              name: data.name ?? "",
              age: data.age ?? "",
              breed: data.breed ?? "",
              location: data.location ?? data.city ?? "",
              description: data.description ?? "",
              image: data.image ?? data.photoUrl ?? "",
              images: mappedImages,
              neutered: data.neutered ?? false,
            };
          });
          setPets(loadedPets);
        } catch (error) {
          console.error("Erro ao carregar perfil e pets:", error);
        } finally {
          setLoadingPets(false);
        }
      };

      loadProfileData();
    }, [])
  );

  const uploadProfileImage = async (localUri: string) => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      throw new Error("Usuário não autenticado");
    }

    const fileName = `profile_${currentUser.uid}_${Date.now()}.jpg`;
    const storageRef = storage().ref(`profilePhotos/${fileName}`);
    const normalizedUri =
      Platform.OS === "android" ? localUri : localUri.replace("file://", "");

    await storageRef.putFile(normalizedUri, { contentType: "image/jpeg" });
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

        const uploadedUrl = await uploadProfileImage(result.assets[0].uri);
        await db()
          .collection("users")
          .doc(currentUser.uid)
          .set(
            { photoUrl: uploadedUrl, updatedAt: new Date() },
            { merge: true },
          );
        setProfileImage(uploadedUrl);
      } catch (error) {
        console.error("Erro ao atualizar foto de perfil:", error);
        showModal({
          title: MODAL_TITLE.error,
          message: "Nao foi possivel atualizar sua foto de perfil.",
          variant: "error",
        });
      } finally {
        hideLoading();
      }
    }
  };

  const handleEditProfile = () => {
    router.push("/screens/editProfile/editProfile.screen");
  };

  const handleLogout = async () => {
    try {
      showLoading();
      await auth().signOut();
      router.replace("/screens/login/login.screen");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      showModal({
        title: MODAL_TITLE.error,
        message: "Nao foi possivel encerrar a sessao. Tente novamente.",
        variant: "error",
      });
    } finally {
      hideLoading();
    }
  };

  const handlePetPress = (pet: Pet) => {
    router.push({
      pathname: "/screens/pdpet/pdpet.screen",
      params: {
        id: pet.id,
        name: pet.name,
        age: pet.age,
        breed: pet.breed,
        location: pet.location,
        description: pet.description,
        image: pet.image,
        images: JSON.stringify(pet.images ?? []),
        neutered: pet.neutered ? "true" : "false",
      },
    });
  };

  const handleDeletePet = (petId: string) => {
    const removePet = async () => {
      try {
        showLoading();
        await db().collection("pets").doc(petId).delete();
        const remainingPets = pets.filter((pet) => pet.id !== petId);
        setPets(remainingPets);
        showModal({
          title: MODAL_TITLE.success,
          message: "O pet foi removido da lista com sucesso.",
          variant: "success",
        });
      } catch (error) {
        console.error("Erro ao excluir pet:", error);
        showModal({
          title: MODAL_TITLE.error,
          message: "Nao foi possivel excluir este pet.",
          variant: "error",
        });
      } finally {
        hideLoading();
      }
    };

    showModal({
      title: MODAL_TITLE.warning,
      message: "Deseja remover este pet da lista?",
      variant: "warning",
      confirmText: MODAL_BUTTON.delete,
      showCancelButton: true,
      onConfirm: removePet,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle={theme.statusBarStyle} backgroundColor="transparent" translucent />
      <View style={styles.content}>

        <AnimatedCard style={styles.userSection}>
          <TouchableOpacity
            onPress={pickProfileImage}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Alterar foto de perfil"
          >
            <Image
              source={{ uri: profileImage }}
              style={styles.userAvatar}
              onError={() => setProfileImage(defaultProfileImage)}
            />
            <View style={styles.avatarOverlay}>
              <Icon family="antdesign" name="camera" size={14} color="onPrimary" />
            </View>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userName}</Text>
            <Text style={styles.userEmail}>{userEmail}</Text>
            <Text style={styles.userLocation}>{userCity}</Text>
          </View>
          <View style={styles.userActions}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleEditProfile}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Editar perfil"
            >
              <Icon name="edit" size={16} color="onPrimary" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButtonLogout}
              onPress={handleLogout}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Sair da conta"
            >
              <Icon name="sign-out" size={16} color="onPrimary" />
            </TouchableOpacity>
          </View>
        </AnimatedCard>

        <AnimatedButton
          title="Conheça nossas ONGs amigas"
          size="md"
          style={styles.ongsButton}
          icon={<Icon name="heart" size={16} color="onPrimary" />}
          onPress={() => router.push("../ongs/ongs.screen")}
        />

        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 120 },
          ]}
          ListEmptyComponent={
            loadingPets ? (
              <Text style={styles.description}>Carregando seus pets...</Text>
            ) : (
              <EmptyList
                illustration
                icon="heart"
                message="Nenhum pet cadastrado ainda."
                hint="Toque em New Pet na barra abaixo para anunciar um amigo."
              />
            )
          }
          renderItem={({ item, index }) => (
            <AnimatedCard index={index}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.card}
                onPress={() => handlePetPress(item)}
                accessibilityRole="button"
                accessibilityLabel={item.name}
                accessibilityHint="Abre os detalhes do pet"
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleDeletePet(item.id)}
                    hitSlop={6}
                    accessibilityRole="button"
                    accessibilityLabel={`Remover ${item.name}`}
                  >
                    <Icon name="trash" size={18} color="onPrimary" />
                  </TouchableOpacity>
                </View>
                <PetCardImage uri={item.image} style={styles.cardImage} />
                <View style={styles.cardInfoRow}>
                  {[item.age, item.breed, item.location].filter(Boolean).map((tag) => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.cardDescription} numberOfLines={3}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            </AnimatedCard>
          )}
        />
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
    </SafeAreaView>
  );
}
