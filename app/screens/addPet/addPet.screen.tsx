import { db } from "@/firebase";
import { FirebaseError } from "@firebase/util";
import { addDoc, collection } from "@react-native-firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import { COLORS } from "../../styles/colors";
import { styles } from "./_addPet.styles";

export default function AddPetScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [neutered, setNeutered] = useState(false);
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState<
    boolean | null
  >(null);
  const petsCollection = collection(db, "pets");
  const { showLoading, hideLoading } = useLoading();

  const pickImage = async () => {
    if (hasGalleryPermission === false) {
      Alert.alert(
        "Permissão necessária",
        "Autorize o acesso à galeria para selecionar uma foto.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    const canceled = "canceled" in result ? result.canceled : result.cancelled;
    const uri = "uri" in result ? result.uri : result.assets?.[0]?.uri;

    if (!canceled && uri) {
      setPhotoUrl(uri);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === "granted");
    })();
  }, []);

  const handleSubmit = async () => {
    showLoading();
    try {
      await addDoc(petsCollection, {
        name,
        age,
        breed,
        neutered,
        city,
        description,
        photoUrl,
      });
      router.push("/screens/petList/petList.screen");
    } catch (e: any) {
      const err = e as FirebaseError;
      Alert.alert("Erro ao criar pet", err.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Cadastrar novo pet</Text>
        <Text style={styles.subtitle}>
          Preencha os detalhes abaixo para anunciar um novo amigo.
        </Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do pet"
          placeholderTextColor="#b8d9bd"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          placeholder="Idade do pet"
          placeholderTextColor="#b8d9bd"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Raça</Text>
        <TextInput
          style={styles.input}
          placeholder="Raça do pet"
          placeholderTextColor="#b8d9bd"
          value={breed}
          onChangeText={setBreed}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Castrado</Text>
          <Switch
            value={neutered}
            onValueChange={setNeutered}
            thumbColor={neutered ? COLORS.primary : COLORS.white}
            trackColor={{
              false: COLORS.borderLight,
              true: COLORS.primaryLight,
            }}
          />
        </View>

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#b8d9bd"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Descrição breve</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          placeholder="Conte um pouco sobre o pet"
          placeholderTextColor="#b8d9bd"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Foto do pet</Text>
        <TouchableOpacity style={styles.input} onPress={pickImage}>
          <Text style={{ color: photoUrl ? COLORS.black : "#b8d9bd" }}>
            {photoUrl ? "Foto selecionada" : "Toque para escolher uma foto"}
          </Text>
        </TouchableOpacity>

        <View style={styles.photoPreview}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.photoImage} />
          ) : (
            <Text style={styles.photoPlaceholder}>
              Preview da foto aparecerá aqui
            </Text>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar pet</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.textButton}
          onPress={() => router.back()}
        >
          <Text style={styles.textButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
