import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./_petList.styles";

const pets = [
  {
    id: "1",
    name: "Luna",
    age: "2 anos",
    breed: "SRD",
    location: "São Paulo",
    description: "Extremamente carinhosa e adora brincar com crianças.",
    image: "https://placedog.net/640/480?id=1",
  },
  {
    id: "2",
    name: "Milo",
    age: "1 ano",
    breed: "Shih Tzu",
    location: "Belo Horizonte",
    description: "Pequeno, tranquilo e ideal para apartamento.",
    image: "https://placedog.net/640/480?id=2",
  },
  {
    id: "3",
    name: "Nina",
    age: "3 anos",
    breed: "SRD",
    location: "Curitiba",
    description: "Muito sociável e adora passeios ao ar livre.",
    image: "https://placedog.net/640/480?id=3",
  },
];

export default function PetListScreen() {
  const handlePetPress = (pet: (typeof pets)[number]) => {
    Alert.alert("Pet selecionado", `Você clicou em ${pet.name}`);
  };

  const handleHomePress = () => {
    Alert.alert("Home", "Você está na home.");
  };

  const handleProfilePress = () => {
    Alert.alert("Perfil", "Abrir perfil do usuário.");
  };

  const handleAddPetPress = () => {
    Alert.alert("Cadastrar pet", "Ir para o formulário de cadastro de pet.");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
