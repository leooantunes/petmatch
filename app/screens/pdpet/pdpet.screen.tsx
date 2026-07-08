import { db } from "@/firebase";
import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import { MODAL_TITLE } from "../../components/modal/modalCopy";
import ModernModal from "../../components/modal/modernModal";
import { COLORS } from "../../styles/colors";
import { PetRouteParams } from "../../types/pets";
import { styles } from "./_pdpet.styles";

const fallbackImage =
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80";

const extractPetImages = (data: Record<string, any>): string[] => {
  const imageCandidates: string[] = [];

  let mainImage = "";

  if (typeof data.image === "string") {
    mainImage = data.image;
  } else if (typeof data.photoUrl === "string") {
    mainImage = data.photoUrl;
  }

  if (mainImage.trim().length > 0) {
    imageCandidates.push(mainImage.trim());
  }

  const gallerySource = data.images ?? data.photoUrls ?? data.photos ?? [];

  if (Array.isArray(gallerySource)) {
    for (const item of gallerySource) {
      if (typeof item === "string" && item.trim().length > 0) {
        imageCandidates.push(item.trim());
      }
    }
  } else if (
    typeof gallerySource === "string" &&
    gallerySource.trim().length > 0
  ) {
    imageCandidates.push(gallerySource.trim());
  }

  return Array.from(new Set(imageCandidates));
};

const parseRouteImages = (value: string | string[] | undefined): string[] => {
  const source = Array.isArray(value) ? value[0] : value;
  if (!source || typeof source !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(source);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is string =>
        typeof item === "string" && item.trim().length > 0,
    );
  } catch {
    return [];
  }
};

const normalizeWhatsAppNumber = (phone: string): string => {
  const digitsOnly = phone.replace(/\D/g, "");

  if (digitsOnly.length === 10 || digitsOnly.length === 11) {
    return `55${digitsOnly}`;
  }

  return digitsOnly;
};

const buildWhatsAppUrl = (phone: string, petName: string): string => {
  const normalizedPhone = normalizeWhatsAppNumber(phone);
  const encodedMessage = encodeURIComponent(
    `Ola! Tenho interesse em adotar ${petName}. Podemos conversar?`,
  );

  return `https://wa.me/${normalizedPhone}?text=${encodedMessage}`;
};

const getOwnerPhoneFromPetData = async (
  data: Record<string, any>,
): Promise<string> => {
  const ownerId = typeof data.ownerId === "string" ? data.ownerId.trim() : "";

  if (!ownerId) {
    return "";
  }

  const userSnapshot = await db().collection("users").doc(ownerId).get();
  if (!userSnapshot.exists) {
    return "";
  }

  const userData = userSnapshot.data() as Record<string, any>;
  return typeof userData.phone === "string" ? userData.phone : "";
};

export default function PdpPetScreen() {
  const router = useRouter();
  const { showLoading, hideLoading } = useLoading();
  const params = useLocalSearchParams<PetRouteParams>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [ownerPhone, setOwnerPhone] = useState("");
  const [currentImageUri, setCurrentImageUri] = useState<string>(fallbackImage);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>(MODAL_TITLE.info);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVariant, setModalVariant] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const getString = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const pet = {
    id: getString(params.id) ?? "",
    name: getString(params.name) ?? "Pet",
    age: getString(params.age) ?? "-",
    breed: getString(params.breed) ?? "-",
    location: getString(params.location) ?? "-",
    description:
      getString(params.description) ??
      "Sem descrição disponível para este pet.",
    image: getString(params.image) ?? "https://placedog.net/640/480?random",
    images: parseRouteImages(params.images),
    neutered: getString(params.neutered) === "true",
  };

  useEffect(() => {
    const loadPetImages = async () => {
      if (!pet.id) {
        setImages([]);
        return;
      }

      try {
        showLoading();
        const snapshot = await db().collection("pets").doc(pet.id).get();
        if (snapshot.exists) {
          const data = snapshot.data() as Record<string, any>;
          const loadedImages = extractPetImages(data);
          setImages(loadedImages);
          setActiveImageIndex(0);
          const phone = await getOwnerPhoneFromPetData(data);
          setOwnerPhone(phone);
        } else {
          setImages([]);
          setOwnerPhone("");
        }
      } catch (error) {
        console.error("Erro ao carregar imagens do pet:", error);
        setModalTitle(MODAL_TITLE.error);
        setModalMessage("Nao foi possivel carregar as fotos deste pet.");
        setModalVariant("error");
        setModalVisible(true);
      } finally {
        hideLoading();
      }
    };

    loadPetImages();
  }, [hideLoading, pet.id, showLoading]);

  const resolvedImages = useMemo(() => {
    if (images.length > 0) return images;
    if (pet.images.length > 0) return pet.images;
    return [pet.image || fallbackImage];
  }, [images, pet.image, pet.images]);

  useEffect(() => {
    const initialUri =
      resolvedImages[activeImageIndex] ?? resolvedImages[0] ?? fallbackImage;
    setCurrentImageUri(initialUri);
  }, [activeImageIndex, resolvedImages]);

  const handleOpenWhatsApp = async () => {
    const sanitizedPhone = normalizeWhatsAppNumber(ownerPhone);

    if (!sanitizedPhone) {
      setModalTitle(MODAL_TITLE.warning);
      setModalMessage("Este anunciante ainda nao possui telefone cadastrado.");
      setModalVariant("warning");
      setModalVisible(true);
      return;
    }

    try {
      const url = buildWhatsAppUrl(ownerPhone, pet.name);
      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        setModalTitle(MODAL_TITLE.error);
        setModalMessage("Nao foi possivel abrir o WhatsApp neste dispositivo.");
        setModalVariant("error");
        setModalVisible(true);
        return;
      }

      await Linking.openURL(url);
    } catch (error) {
      console.error("Erro ao abrir WhatsApp:", error);
      setModalTitle(MODAL_TITLE.error);
      setModalMessage("Nao foi possivel iniciar a conversa no WhatsApp.");
      setModalVariant("error");
      setModalVisible(true);
    }
  };

  return (
    <View
      style={[
        styles.container,
        Platform.OS === "android"
          ? { paddingTop: StatusBar.currentHeight || 0 }
          : {},
      ]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={18} color={COLORS.primary} />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        <View style={styles.imageCarouselContainer}>
          <Image
            source={{ uri: currentImageUri }}
            style={styles.petImage}
            onError={() => setCurrentImageUri(fallbackImage)}
          />
          <View style={styles.carouselDots}>
            {resolvedImages.map((image, index) => (
              <TouchableOpacity
                key={`${image}-${index}`}
                style={[
                  styles.carouselDot,
                  index === activeImageIndex && styles.carouselDotActive,
                ]}
                onPress={() => setActiveImageIndex(index)}
              />
            ))}
          </View>
        </View>

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.petName}>{pet.name}</Text>
            <Text style={styles.petBreed}>{pet.breed}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>Disponível</Text>
          </View>
        </View>

        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{pet.age}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{pet.location}</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {pet.neutered ? "Castrado" : "Não castrado"}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Sobre {pet.name}</Text>
        <Text style={styles.description}>{pet.description}</Text>

        <View style={styles.profileRow}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Raça</Text>
            <Text style={styles.profileValue}>{pet.breed}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Idade</Text>
            <Text style={styles.profileValue}>{pet.age}</Text>
          </View>
        </View>

        <View style={styles.profileRow}>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Localização</Text>
            <Text style={styles.profileValue}>{pet.location}</Text>
          </View>
          <View style={styles.profileItem}>
            <Text style={styles.profileLabel}>Status</Text>
            <Text style={styles.profileValue}>Aguardando adoção</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.adoptButton} onPress={handleOpenWhatsApp}>
          <Text style={styles.adoptButtonText}>Quero adotar</Text>
        </TouchableOpacity>
      </ScrollView>

      <ModernModal
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        variant={modalVariant}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}