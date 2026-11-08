import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "../../components/backButton/backButton.component";
import { AnimatedButton } from "../../components/buttons/AnimatedButton";
import { AnimatedCard } from "../../components/cards/AnimatedCard";
import { useTheme, useThemedStyles } from "../../hooks/useTheme";
import { Icon } from "../../components/icon/Icon";
import { createOngsStyles } from "./_ongs.styles";

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
  const theme = useTheme();
  const styles = useThemedStyles(createOngsStyles);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle={theme.statusBarStyle} backgroundColor="transparent" translucent />
      <FlatList
        data={partnerOngs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title} accessibilityRole="header">ONGs amigas</Text>
            <Text style={styles.subtitle}>
              Conheça as organizações que ajudam a transformar a vida de muitos
              pets.
            </Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <AnimatedCard index={index} style={styles.card}>
            <Image
              source={petPixelArt}
              style={styles.image}
              resizeMode="contain"
              accessibilityElementsHidden
              importantForAccessibility="no"
            />
            <View style={styles.cardContent}>
              <Text style={styles.ongName}>{item.name}</Text>
              <Text style={styles.pixLabel}>Pix para doações</Text>
              <Text style={styles.pixValue} selectable>
                {item.pix}
              </Text>
              <AnimatedButton
                title="Falar pelo WhatsApp"
                size="sm"
                style={styles.whatsappButton}
                textStyle={styles.whatsappButtonText}
                icon={<Icon name="whatsapp" size={18} color="onPrimary" />}
                accessibilityLabel={`Falar com ${item.name} pelo WhatsApp`}
                onPress={() => void openWhatsApp(item.whatsapp, item.name)}
              />
            </View>
          </AnimatedCard>
        )}
      />
    </SafeAreaView>
  );
}
