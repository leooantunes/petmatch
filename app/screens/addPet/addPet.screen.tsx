import { db } from "@/firebase";
import { AntDesign } from "@expo/vector-icons";
import { FirebaseError } from "@firebase/util";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import { MODAL_BUTTON, MODAL_TITLE } from "../../components/modal/modalCopy";
import ModernModal from "../../components/modal/modernModal";
import { COLORS } from "../../styles/colors";
import { styles } from "./_addPet.styles";

type ModalState = {
  visible: boolean;
  title: string;
  message: string;
  variant: "success" | "error" | "info" | "warning";
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
};

const parseDogBreeds = (message?: Record<string, string[]>): string[] => {
  const entries = Object.entries(message ?? {});
  const parsedBreeds: string[] = [];

  for (const [breedName, subBreeds] of entries) {
    if (!subBreeds?.length) {
      parsedBreeds.push(breedName);
      continue;
    }

    for (const subBreed of subBreeds) {
      parsedBreeds.push(`${subBreed} ${breedName}`);
    }
  }

  return parsedBreeds;
};

const AGE_RANGES = [
  "0-1 ano",
  "1-3 anos",
  "4-6 anos",
  "7-9 anos",
  "10-12 anos",
  "13+ anos",
  "Idade desconhecida",
];

export default function AddPetScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [isStreetAnimal, setIsStreetAnimal] = useState(false);
  const [neutered, setNeutered] = useState(false);
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoadingBreeds, setIsLoadingBreeds] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);
  const [openSelect, setOpenSelect] = useState<"age" | "breed" | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<
    boolean | null
  >(null);
  const [modal, setModal] = useState<ModalState>({
    visible: false,
    title: "",
    message: "",
    variant: "info",
    confirmText: MODAL_BUTTON.ok,
    cancelText: MODAL_BUTTON.cancel,
    showCancelButton: false,
  });
  const { showLoading, hideLoading } = useLoading();

  const showModal = (next: Omit<ModalState, "visible">) => {
    setModal({ ...next, visible: true });
  };

  const hideModal = () => {
    setModal((prev) => ({ ...prev, visible: false }));
  };

  const removeBrokenPhoto = (uriToRemove: string) => {
    setPhotoUrls((prev) => prev.filter((item) => item !== uriToRemove));
  };

  const pickImages = async () => {
    if (hasGalleryPermission === false) {
      showModal({
        title: MODAL_TITLE.warning,
        message: "Autorize o acesso à galeria para selecionar fotos.",
        variant: "warning",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedUris = result.assets
        .map((asset) => asset.uri)
        .filter((uri): uri is string => Boolean(uri));

      setPhotoUrls((prev) => [...prev, ...selectedUris]);
    }
  };

  const uploadPetPhoto = async (localUri: string): Promise<string> => {
    const uniqueId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}`;
    const filename = `pet_${uniqueId}`;
    const storageRef = storage().ref(`petPhotos/${filename}`);
    const normalizedUri =
      Platform.OS === "android" ? localUri : localUri.replace("file://", "");

    try {
      // Verificar se o usuário está autenticado
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error("Usuário não autenticado. Faça login novamente.");
      }

      await storageRef.putFile(normalizedUri);
      return await storageRef.getDownloadURL();
    } catch (error: any) {
      console.error("Erro ao fazer upload:", error);
      if (error.code === "storage/unauthorized") {
        throw new Error(
          "Erro de permissão no Storage. Verifique as configurações de segurança do Firebase.",
        );
      }
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const loadBreeds = async () => {
      setIsLoadingBreeds(true);

      try {
        const [dogResponse, catResponse] = await Promise.all([
          fetch("https://dog.ceo/api/breeds/list/all"),
          fetch("https://api.thecatapi.com/v1/breeds"),
        ]);

        const dogData = (await dogResponse.json()) as {
          message?: Record<string, string[]>;
        };
        const catData = (await catResponse.json()) as {
          name?: string;
        }[];

        const dogBreeds = parseDogBreeds(dogData.message);

        const catBreeds = (catData ?? [])
          .map((item) => item.name)
          .filter((item): item is string => Boolean(item));

        const normalizedBreeds = Array.from(
          new Set(
            [...dogBreeds, ...catBreeds, "Sem raça definida"]
              .map((item) => item.trim())
              .filter((item) => item.length > 0),
          ),
        ).sort((a, b) => a.localeCompare(b, "pt-BR"));

        setBreeds(normalizedBreeds);
      } catch (error) {
        console.error("Nao foi possivel carregar racas da web:", error);
        setBreeds([
          "Sem raça definida",
          "Labrador Retriever",
          "Golden Retriever",
          "Poodle",
          "Bulldog Francês",
          "Persa",
          "Siamês",
          "Maine Coon",
        ]);
      } finally {
        setIsLoadingBreeds(false);
      }
    };

    loadBreeds();
  }, []);

  const getCurrentCity = async (): Promise<string> => {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status !== "granted") {
      return "Cidade não informada";
    }

    const position = await Location.getCurrentPositionAsync({});
    const geocode = await Location.reverseGeocodeAsync({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    const place = geocode[0];
    return (
      place?.city || place?.subregion || place?.region || "Cidade não informada"
    );
  };

  const fillCityFromLocation = async (showErrorModal = true) => {
    try {
      setCity("Buscando cidade...");
      const detectedCity = await getCurrentCity();
      setCity(detectedCity);
    } catch (error) {
      console.error("Nao foi possivel obter a cidade da localizacao:", error);
      setCity("Cidade não informada");
      if (showErrorModal) {
        showModal({
          title: MODAL_TITLE.info,
          message:
            "Nao foi possivel detectar sua cidade automaticamente. Voce pode ajustar esse campo manualmente.",
          variant: "info",
        });
      }
    }
  };

  const handleStreetAnimalToggle = async () => {
    const nextValue = !isStreetAnimal;
    setIsStreetAnimal(nextValue);

    if (nextValue) {
      setName("Sem nome");
      setAge("Idade desconhecida");
      setBreed("Desconhecida");
      setDescription("Animal resgatado da rua.");

      await fillCityFromLocation();
    } else {
      setName("");
      setAge("");
      setBreed("");
      setDescription("");
      await fillCityFromLocation();
    }
  };

  const handleSubmit = async () => {
    showLoading();
    try {
      let uploadedPhotoUrls: string[] = [];

      if (photoUrls.length > 0) {
        const uploadResults = await Promise.allSettled(
          photoUrls.map((photoUrl) => uploadPetPhoto(photoUrl)),
        );

        uploadedPhotoUrls = uploadResults
          .filter(
            (uploadResult): uploadResult is PromiseFulfilledResult<string> =>
              uploadResult.status === "fulfilled",
          )
          .map((uploadResult) => uploadResult.value);
      }

      if (uploadedPhotoUrls.length === 0) {
        showModal({
          title: MODAL_TITLE.warning,
          message: "Selecione pelo menos uma foto para cadastrar o pet.",
          variant: "warning",
        });
        return;
      }

      await db()
        .collection("pets")
        .add({
          name,
          age,
          breed,
          neutered,
          location: city,
          description,
          image: uploadedPhotoUrls[0],
          images: uploadedPhotoUrls,
          ownerId: auth().currentUser?.uid ?? null,
          createdAt: new Date(),
        });

      showModal({
        title: MODAL_TITLE.success,
        message: "Seu anuncio foi publicado com sucesso.",
        variant: "success",
        confirmText: MODAL_BUTTON.viewList,
        onConfirm: () => router.push("/screens/petList/petList.screen"),
      });
    } catch (e: any) {
      const err = e as FirebaseError;
      showModal({
        title: MODAL_TITLE.error,
        message:
          err?.message || "Nao foi possivel cadastrar o pet. Tente novamente.",
        variant: "error",
      });
      console.log("Erro ao criar pet:", err.message);
    } finally {
      hideLoading();
    }
  };

  const renderAgeOptions = () => AGE_RANGES;

  const renderBreedOptions = () => breeds;

  const renderDropdown = (
    label: string,
    value: string,
    options: string[],
    onSelect: (selectedValue: string) => void,
    selectType: "age" | "breed",
    disabled?: boolean,
    scrollable?: boolean,
  ) => {
    const isOpen = openSelect === selectType;

    return (
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setOpenSelect(isOpen ? null : selectType)}
          activeOpacity={0.9}
          disabled={disabled}
        >
          <Text
            style={[
              styles.dropdownButtonText,
              !value && styles.dropdownPlaceholder,
            ]}
          >
            {value || label}
          </Text>
          <AntDesign
            name={isOpen ? "up" : "down"}
            size={14}
            color={COLORS.primaryMedium}
          />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownMenu}>
            {scrollable ? (
              <ScrollView nestedScrollEnabled style={styles.dropdownScroll}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.dropdownItem}
                    onPress={() => {
                      onSelect(option);
                      setOpenSelect(null);
                    }}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.dropdownItemText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    onSelect(option);
                    setOpenSelect(null);
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.dropdownItemText}>{option}</Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.header}>Cadastrar novo pet</Text>
          <Text style={styles.subtitle}>
            Preencha os detalhes abaixo para anunciar um novo amigo.
          </Text>

          <Text style={styles.label}>Fotos do pet</Text>
          <TouchableOpacity style={styles.photoUploadCard} onPress={pickImages}>
            <View style={styles.photoUploadIconBox}>
              <AntDesign name="picture" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.photoUploadTextBox}>
              <Text style={styles.photoUploadTitle}>
                {photoUrls.length > 0
                  ? `${photoUrls.length} foto(s) adicionada(s)`
                  : "Adicionar fotos do pet"}
              </Text>
              <Text style={styles.photoUploadSubtitle}>
                Toque para selecionar imagens da galeria
              </Text>
            </View>
          </TouchableOpacity>

          {photoUrls.length > 0 ? (
            <FlatList
              data={photoUrls}
              keyExtractor={(uri, index) => `${uri}-${index}`}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.photosGrid}
              columnWrapperStyle={styles.photosGridRow}
              renderItem={({ item: uri }) => (
                <View style={styles.photoCard}>
                  <Image
                    source={{ uri }}
                    style={styles.photoImage}
                    onError={() => removeBrokenPhoto(uri)}
                  />
                </View>
              )}
            />
          ) : (
            <View style={styles.photoPreview}>
              <Text style={styles.photoPlaceholder}>
                Preview das fotos aparecerá aqui
              </Text>
            </View>
          )}

          {photoUrls.length === 0 && (
            <Text style={styles.photoPlaceholder}>
              Adicione ao menos uma foto para liberar os demais campos.
            </Text>
          )}

          {photoUrls.length > 0 && (
            <>
              <Text style={styles.label}>Tipo do cadastro</Text>
              <TouchableOpacity
                style={[
                  styles.switchRow,
                  isStreetAnimal && styles.switchRowActive,
                ]}
                onPress={handleStreetAnimalToggle}
                activeOpacity={0.9}
              >
                <View style={styles.switchLabelBox}>
                  <Text style={styles.switchText}>Animal de rua</Text>
                  <Text style={styles.switchHint}>
                    {isStreetAnimal ? "Sim" : "Não"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.switchTrack,
                    isStreetAnimal && styles.switchTrackActive,
                  ]}
                >
                  <View
                    style={[
                      styles.switchThumb,
                      isStreetAnimal && styles.switchThumbActive,
                    ]}
                  />
                </View>
              </TouchableOpacity>

              <Text style={styles.subtitle}>
                {isStreetAnimal
                  ? "Modo rua ativo: campos preenchidos automaticamente."
                  : "Modo padrão: preencha os dados do pet manualmente."}
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
              {renderDropdown(
                "Selecione a faixa de idade",
                age,
                renderAgeOptions(),
                setAge,
                "age",
                false,
                true,
              )}

              <Text style={styles.label}>Raça</Text>
              {renderDropdown(
                isLoadingBreeds ? "Carregando raças..." : "Selecione uma raça",
                breed,
                renderBreedOptions(),
                setBreed,
                "breed",
                isLoadingBreeds,
                true,
              )}

              <TouchableOpacity
                style={[styles.switchRow, neutered && styles.switchRowActive]}
                onPress={() => setNeutered((value) => !value)}
                activeOpacity={0.9}
              >
                <View style={styles.switchLabelBox}>
                  <Text style={styles.switchText}>Castrado</Text>
                  <Text style={styles.switchHint}>
                    {neutered ? "Sim" : "Não"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.switchTrack,
                    neutered && styles.switchTrackActive,
                  ]}
                >
                  <View
                    style={[
                      styles.switchThumb,
                      neutered && styles.switchThumbActive,
                    ]}
                  />
                </View>
              </TouchableOpacity>

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
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top" },
                ]}
                placeholder="Conte um pouco sobre o pet"
                placeholderTextColor="#b8d9bd"
                value={description}
                onChangeText={setDescription}
                multiline
              />

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar pet</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={styles.textButton}
            onPress={() => router.back()}
          >
            <Text style={styles.textButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>

      <ModernModal
        visible={modal.visible}
        title={modal.title}
        message={modal.message}
        variant={modal.variant}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        showCancelButton={modal.showCancelButton}
        onConfirm={modal.onConfirm}
        onClose={hideModal}
      />
    </KeyboardAvoidingView>
  );
}
