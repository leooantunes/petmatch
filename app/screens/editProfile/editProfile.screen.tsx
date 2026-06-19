import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { UserProfile } from "../../types/user";
import { styles } from "./_editProfile.styles";

export default function EditProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>({
    name: "Maria Silva",
    email: "maria@example.com",
    phone: "(11) 99999-9999",
    age: "28",
    city: "São Paulo",
    password: "12345678",
  });

  const handleSave = () => {
    if (
      !profile.name ||
      !profile.email ||
      !profile.phone ||
      !profile.age ||
      !profile.city
    ) {
      Alert.alert(
        "Dados incompletos",
        "Por favor, preencha todos os campos obrigatórios.",
      );
      return;
    }

    Alert.alert("Dados atualizados", "Seu perfil foi atualizado com sucesso.");
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Editar perfil</Text>
        <Text style={styles.subtitle}>
          Atualize suas informações de usuário para manter seu perfil sempre
          correto.
        </Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#b8d9bd"
          value={profile.name}
          onChangeText={(name) => setProfile({ ...profile, name })}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b8d9bd"
          value={profile.email}
          onChangeText={(email) => setProfile({ ...profile, email })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Celular</Text>
        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#b8d9bd"
          value={profile.phone}
          onChangeText={(phone) => setProfile({ ...profile, phone })}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          placeholder="Idade"
          placeholderTextColor="#b8d9bd"
          value={profile.age}
          onChangeText={(age) => setProfile({ ...profile, age })}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#b8d9bd"
          value={profile.city}
          onChangeText={(city) => setProfile({ ...profile, city })}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#b8d9bd"
          secureTextEntry
          value={profile.password}
          onChangeText={(password) => setProfile({ ...profile, password })}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
