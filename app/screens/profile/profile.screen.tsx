import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pet } from "../../types/pets";
import { styles } from "./_profile.styles";

const initialPets: Pet[] = [
  {
    id: "1",
    name: "Luna",
    age: "2 anos",
    breed: "SRD",
    location: "São Paulo",
    description: "Extremamente carinhosa e adora brincar com crianças.",
    image: "https://placedog.net/640/480?id=1",
    neutered: false,
  },
  {
    id: "2",
    name: "Milo",
    age: "1 ano",
    breed: "Shih Tzu",
    location: "Belo Horizonte",
    description: "Pequeno, tranquilo e ideal para apartamento.",
    image: "https://placedog.net/640/480?id=2",
    neutered: false,
  },
  {
    id: "3",
    name: "Nina",
    age: "3 anos",
    breed: "SRD",
    location: "Curitiba",
    description: "Muito sociável e adora passeios ao ar livre.",
    image: "https://placedog.net/640/480?id=3",
    neutered: false,
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>(initialPets);

  const handleEditProfile = () => {
    router.push("/screens/editProfile/editProfile.screen");
  };

  const handleLogout = () => {
    router.replace("/screens/login/login.screen");
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
        neutered: pet.neutered ? "true" : "false",
      },
    });
  };

  const handleDeletePet = (petId: string) => {
    Alert.alert("Excluir anúncio", "Deseja remover este pet da lista?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => setPets(pets.filter((pet) => pet.id !== petId)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Editar meus dados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Deslogar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Meus pets anunciados</Text>

        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.card}
              onPress={() => handlePetPress(item)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardName}>{item.name}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleDeletePet(item.id)}
                >
                  <FontAwesome name="trash" size={18} color="#ffffff" />
                </TouchableOpacity>
              </View>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardInfoRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.age}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.breed}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{item.location}</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.description}>Nenhum pet cadastrado ainda.</Text>
          }
        />
      </View>
    </View>
  );
}
