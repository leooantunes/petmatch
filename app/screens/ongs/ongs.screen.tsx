import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./_ongs.styles";

type PartnerOng = {
  id: string;
  name: string;
  pix: string;
  whatsapp: string;
};

const partnerOngs: PartnerOng[] = [
  {
    id: "ong-1",
    name: "Amigos de Quatro Patas",
    pix: "pix@amigosdequatropatas.org",
    whatsapp: "5511999990001",
  },
  {
    id: "ong-2",
    name: "Resgate Animal",
    pix: "pix@resgateanimal.org",
    whatsapp: "5511999990002",
  },
  {
    id: "ong-3",
    name: "Patinhas do Bem",
    pix: "pix@patinhasdobem.org",
    whatsapp: "5511999990003",
  },
];

const petPixelArt = require("../../../assets/images/gato-cachorro-pixel-v3.png");

const openWhatsApp = async (phone: string, ongName: string) => {
  const url = `https://wa.me/${phone}`;

  try {
    if (!(await Linking.canOpenURL(url))) {
      Alert.alert(
        "WhatsApp indisponível",
        "Não foi possível abrir o WhatsApp neste dispositivo.",
      );
      return;
    }

    await Linking.openURL(url);
  } catch (error) {
    console.error(`Erro ao abrir WhatsApp da ONG ${ongName}:`, error);
    Alert.alert("Erro", "Não foi possível abrir o contato da ONG.");
  }
};

export default function OngsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={partnerOngs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              accessibilityLabel="Voltar"
            >
              <FontAwesome name="arrow-left" size={16} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.title}>ONGs amigas</Text>
            <Text style={styles.subtitle}>
              Conheça as organizações que ajudam a transformar a vida de muitos
              pets.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={petPixelArt} style={styles.image} resizeMode="contain" />
            <View style={styles.cardContent}>
              <Text style={styles.ongName}>{item.name}</Text>
              <Text style={styles.pixLabel}>Pix para doações</Text>
              <Text style={styles.pixValue}>{item.pix}</Text>
              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() => void openWhatsApp(item.whatsapp, item.name)}
                activeOpacity={0.85}
              >
                <FontAwesome name="whatsapp" size={18} color="#ffffff" />
                <Text style={styles.whatsappButtonText}>Falar pelo WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
