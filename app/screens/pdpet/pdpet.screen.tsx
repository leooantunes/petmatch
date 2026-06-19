import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../styles/colors";
import { PetRouteParams } from "../../types/pets";
import { styles } from "./_pdpet.styles";

export default function PdpPetScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<PetRouteParams>();

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
    neutered: getString(params.neutered) === "true",
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={18} color={COLORS.primary} />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>

        <Image source={{ uri: pet.image }} style={styles.petImage} />

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

        <TouchableOpacity style={styles.adoptButton}>
          <Text style={styles.adoptButtonText}>Quero adotar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
