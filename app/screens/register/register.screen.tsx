import { db } from "@/firebase";
import { FirebaseError } from "@firebase/util";
import auth from "@react-native-firebase/auth";
import { addDoc, collection } from "@react-native-firebase/firestore";
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
import { useLoading } from "../../components/loading/loading.component";
import { styles } from "./_register.styles";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const { showLoading, hideLoading } = useLoading();
  const user = collection(db, "users");

  const handleRegister = async () => {
    showLoading();
    try {
      const credential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await addDoc(user, {
        user: credential.user.email,
        email,
        phone,
        city,
      });

      router.push("/screens/petList/petList.screen");
    } catch (e: any) {
      const err = e as FirebaseError;
      Alert.alert("Erro ao criar usuário", err.message);
      console.error("Erro ao criar usuário:", err.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastre-se</Text>
        <Text style={styles.subtitle}>
          Crie sua conta para encontrar um novo amigo
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b8d9bd"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
        />

        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#b8d9bd"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          textContentType="telephoneNumber"
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#b8d9bd"
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#b8d9bd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          textContentType="password"
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
          <Text style={styles.buttonPrimaryText}>Criar conta</Text>
        </TouchableOpacity>

        <Text style={styles.helperText}>
          Seus dados são confidenciais e usados apenas para criar seu perfil.
        </Text>

        <Text style={styles.footerText}>
          Já tem conta? <Text style={styles.linkText}>Entrar</Text>
        </Text>
      </View>
    </ScrollView>
  );
}
