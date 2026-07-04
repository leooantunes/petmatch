import { db } from "@/firebase";
import { collection, getDocs } from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import { MODAL_TITLE } from "../../components/modal/modalCopy";
import ModernModal from "../../components/modal/modernModal";
import { Pet } from "../../types/pets";
import { styles } from "./_petList.styles";

const fallbackImage =
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80";

const mapPetImages = (rawImages: unknown): string[] => {
  if (!Array.isArray(rawImages)) {
    return [];
  }

  return rawImages.filter(
    (item): item is string =>
      typeof item === "string" && item.trim().length > 0,
  );
};

function PetListImage({ uri, style }: Readonly<{ uri?: string; style?: any }>) {
  const [imageUri, setImageUri] = useState(uri ?? fallbackImage);

  useEffect(() => {
    setImageUri(uri ?? fallbackImage);
  }, [uri]);

  return (
    <Image
      source={{ uri: imageUri }}
      style={style}
      onError={() => {
        if (imageUri !== fallbackImage) {
          setImageUri(fallbackImage);
        }
      }}
    />
  );
}

export default function PetListScreen() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const { showLoading, hideLoading } = useLoading();
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const loadPets = async () => {
      setIsLoadingList(true);
      showLoading();
      try {
        const querySnapshot = await getDocs(collection(db, "pets"));
        const loadedPets: Pet[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Record<string, any>;
          const rawImages = data.images ?? data.photoUrls ?? data.photos ?? [];
          const mappedImages = mapPetImages(rawImages);

          return {
            id: doc.id,
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
        console.error("Erro ao carregar pets:", error);
        setModalMessage("Nao foi possivel carregar a lista de pets.");
        setModalVisible(true);
      } finally {
        setIsLoadingList(false);
        hideLoading();
      }
    };

    loadPets();
  }, [hideLoading, showLoading]);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          isLoadingList ? (
            <Text style={styles.emptyText}>Carregando pets...</Text>
          ) : (
            <Text style={styles.emptyText}>Nenhum pet encontrado.</Text>
          )
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={() => handlePetPress(item)}
          >
            <PetListImage uri={item.image} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.petName}>{item.name}</Text>
              <View style={styles.petInfoRow}>
                <Text style={styles.petInfoTag}>{item.age}</Text>
                <Text style={styles.petInfoTag}>{item.breed}</Text>
                <Text style={styles.petInfoTag}>{item.location}</Text>
              </View>
              <Text style={styles.petDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <ModernModal
        visible={modalVisible}
        title={MODAL_TITLE.error}
        message={modalMessage}
        variant="error"
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
