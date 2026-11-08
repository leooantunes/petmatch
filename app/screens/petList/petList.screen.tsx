import { db } from "@/firebase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedCard } from "../../components/cards/AnimatedCard";
import { EmptyList } from "../../components/emptyList/emptyList.component";
import { MODAL_TITLE } from "../../components/modal/modalCopy";
import ModernModal from "../../components/modal/modernModal";
import { PetCardSkeleton } from "../../components/skeleton/Skeleton";
import { useImageFallback } from "../../hooks/useImageFallback";
import { useTheme, useThemedStyles } from "../../hooks/useTheme";
import { Pet } from "../../types/pets";
import { createPetListStyles } from "./_petList.styles";

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
  const { imageUri, handleError } = useImageFallback(uri);

  return (
    <Image
      source={{ uri: imageUri }}
      style={style}
      onError={handleError}
    />
  );
}

export default function PetListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useThemedStyles(createPetListStyles);
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // The list shows skeleton cards while loading, so no blocking overlay here.
  useEffect(() => {
    const loadPets = async () => {
      setIsLoadingList(true);
      try {
        const querySnapshot = await db()
          .collection("pets")
          .where("isApproved", "==", true)
          .get();
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
      }
    };

    loadPets();
  }, []);

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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle={theme.statusBarStyle} backgroundColor="transparent" translucent />
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
        ListEmptyComponent={
          isLoadingList ? (
            <View>
              <PetCardSkeleton />
              <PetCardSkeleton />
              <PetCardSkeleton />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <EmptyList
                illustration
                icon="paw"
                message="Nenhum pet encontrado."
                hint="Volte mais tarde: novos amigos chegam todos os dias."
              />
            </View>
          )
        }
        renderItem={({ item, index }) => {
          const tags = [item.age, item.breed, item.location].filter(Boolean);
          return (
            <AnimatedCard index={index}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.card}
                onPress={() => handlePetPress(item)}
                accessibilityRole="button"
                accessibilityLabel={`${item.name}, ${tags.join(", ")}`}
                accessibilityHint="Abre os detalhes do pet"
              >
                <PetListImage uri={item.image} style={styles.cardImage} />
                <View style={styles.cardBody}>
                  <Text style={styles.petName}>{item.name}</Text>
                  <View style={styles.petInfoRow}>
                    {tags.map((tag) => (
                      <Text key={tag} style={styles.petInfoTag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.petDescription} numberOfLines={3}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            </AnimatedCard>
          );
        }}
      />

      <ModernModal
        visible={modalVisible}
        title={MODAL_TITLE.error}
        message={modalMessage}
        variant="error"
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}
