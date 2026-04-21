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
import { styles } from "./_profile.styles";

const initialPets = [
  {
    id: "1",
    name: "Luna",
    age: "2 anos",
    breed: "SRD",
    city: "São Paulo",
    description: "Extremamente carinhosa e adora brincar com crianças.",
    image: "https://placedog.net/640/480?id=1",
  },
  {
    id: "2",
    name: "Milo",
    age: "1 ano",
    breed: "Shih Tzu",
    city: "Belo Horizonte",
    description: "Pequeno, tranquilo e ideal para apartamento.",
    image: "https://placedog.net/640/480?id=2",
  },
  {
    id: "3",
    name: "Nina",
    age: "3 anos",
    breed: "SRD",
    city: "Curitiba",
    description: "Muito sociável e adora passeios ao ar livre.",
    image: "https://placedog.net/640/480?id=3",
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [pets, setPets] = useState(initialPets);

  const handleEditProfile = () => {
    router.push("/screens/editProfile/editProfile.screen");
  };

  const handleLogout = () => {
    router.replace("/screens/login/login.screen");
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
            <View style={styles.card}>
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
                  <Text style={styles.tagText}>{item.city}</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.description}>Nenhum pet cadastrado ainda.</Text>
          }
        />
      </View>
    </View>
  );
}
