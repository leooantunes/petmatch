import { db } from "@/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../styles/colors";
import { styles } from "./_pendingPetsApproval.styles";

interface PendingPet {
  id: string;
  name: string;
  breed: string;
  age: string;
  location: string;
  description: string;
  image: string;
  createdAt: any;
  ownerId?: string;
}

export default function PendingPetsApprovalScreen() {
  const [pendingPets, setPendingPets] = useState<PendingPet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPet, setSelectedPet] = useState<PendingPet | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const loadPendingPets = useCallback(async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await db()
        .collection("pets")
        .where("status", "==", "pending")
        .orderBy("createdAt", "desc")
        .get();

      const pets = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name ?? "",
          breed: data.breed ?? "",
          age: data.age ?? "",
          location: data.location ?? "",
          description: data.description ?? "",
          image: data.image ?? "",
          createdAt: data.createdAt,
          ownerId: data.ownerId,
        };
      });

      setPendingPets(pets);
    } catch (error) {
      console.error("Erro ao carregar pets pendentes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPendingPets();
    }, [loadPendingPets])
  );

  const handleApprovePet = async (petId: string) => {
    setIsProcessing(true);
    try {
      await db()
        .collection("pets")
        .doc(petId)
        .update({
          status: "approved",
          approvedAt: new Date(),
        });

      setPendingPets((prev) => prev.filter((pet) => pet.id !== petId));
      setSelectedPet(null);
    } catch (error) {
      console.error("Erro ao aprovar pet:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectPet = async (petId: string) => {
    if (!rejectionReason.trim()) {
      alert("Por favor, forneça um motivo para a rejeição.");
      return;
    }

    setIsProcessing(true);
    try {
      await db()
        .collection("pets")
        .doc(petId)
        .update({
          status: "rejected",
          rejectionReason: rejectionReason,
          rejectedAt: new Date(),
        });

      setPendingPets((prev) => prev.filter((pet) => pet.id !== petId));
      setSelectedPet(null);
      setRejectionReason("");
    } catch (error) {
      console.error("Erro ao rejeitar pet:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedPet) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Aprovar Pets</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{pendingPets.length}</Text>
          </View>
        </View>

        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : pendingPets.length === 0 ? (
          <View style={styles.centerContainer}>
            <MaterialCommunityIcons
              name="check-all"
              size={64}
              color={COLORS.primaryLight}
            />
            <Text style={styles.emptyText}>
              Todos os pets foram aprovados!
            </Text>
          </View>
        ) : (
          <FlatList
            data={pendingPets}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.petCard}
                onPress={() => setSelectedPet(item)}
              >
                <Image source={{ uri: item.image }} style={styles.petImage} />
                <View style={styles.petInfo}>
                  <Text style={styles.petName}>{item.name}</Text>
                  <Text style={styles.petDetails}>
                    {item.breed} • {item.age}
                  </Text>
                  <Text style={styles.petLocation}>{item.location}</Text>
                  <Text style={styles.petDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={COLORS.primaryMedium}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => setSelectedPet(null)}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Revisar Pet</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.detailContent}
        contentContainerStyle={styles.detailContentInner}
      >
        <Image
          source={{ uri: selectedPet.image }}
          style={styles.detailImage}
        />

        <View style={styles.detailInfo}>
          <Text style={styles.detailName}>{selectedPet.name}</Text>
          <Text style={styles.detailSubtitle}>
            {selectedPet.breed} • {selectedPet.age}
          </Text>
          <Text style={styles.detailLocation}>{selectedPet.location}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Descrição</Text>
          <Text style={styles.description}>{selectedPet.description}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Motivo da Rejeição (se aplicável)</Text>
          <TextInput
            style={styles.reasonInput}
            placeholder="Descreva o motivo da rejeição..."
            placeholderTextColor="#b8d9bd"
            value={rejectionReason}
            onChangeText={setRejectionReason}
            multiline
            editable={!isProcessing}
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={() => handleRejectPet(selectedPet.id)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.buttonText}>Rejeitar</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.approveButton]}
              onPress={() => handleApprovePet(selectedPet.id)}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="white"
                  />
                  <Text style={styles.buttonText}>Aprovar</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
