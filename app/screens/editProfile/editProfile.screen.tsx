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
import { styles } from "./_editProfile.styles";

export default function EditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("Maria Silva");
  const [email, setEmail] = useState("maria@example.com");
  const [phone, setPhone] = useState("(11) 99999-9999");
  const [age, setAge] = useState("28");
  const [city, setCity] = useState("São Paulo");
  const [password, setPassword] = useState("12345678");

  const handleSave = () => {
    if (!name || !email || !phone || !age || !city) {
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
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b8d9bd"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Celular</Text>
        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#b8d9bd"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Idade</Text>
        <TextInput
          style={styles.input}
          placeholder="Idade"
          placeholderTextColor="#b8d9bd"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Cidade</Text>
        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#b8d9bd"
          value={city}
          onChangeText={setCity}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#b8d9bd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
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
