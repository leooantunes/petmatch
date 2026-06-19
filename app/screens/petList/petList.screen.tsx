import { db } from "@/firebase";
import { collection, getDocs } from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Pet } from "../../types/pets";
import { styles } from "./_petList.styles";

export default function PetListScreen() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "pets"));
        const loadedPets: Pet[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Record<string, any>;

          return {
            id: doc.id,
            name: data.name ?? "",
            age: data.age ?? "",
            breed: data.breed ?? "",
            location: data.location ?? data.city ?? "",
            description: data.description ?? "",
            image: data.image ?? data.photoUrl ?? "",
            neutered: data.neutered ?? false,
          };
        });
        setPets(loadedPets);
      } catch (error) {
        console.error("Erro ao carregar pets:", error);
      } finally {
        setLoading(false);
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
          loading ? (
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
            <Image source={{ uri: item.image }} style={styles.cardImage} />
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
    </View>
  );
}
