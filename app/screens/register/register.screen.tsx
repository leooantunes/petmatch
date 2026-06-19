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
import { UserRegistration } from "../../types/user";
import { styles } from "./_register.styles";

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState<UserRegistration>({
    email: "",
    phone: "",
    city: "",
    password: "",
  });
  const { showLoading, hideLoading } = useLoading();
  const usersCollection = collection(db, "users");

  const handleRegister = async () => {
    showLoading();
    try {
      const credential = await auth().createUserWithEmailAndPassword(
        form.email,
        form.password,
      );

      await addDoc(usersCollection, {
        uid: credential.user.uid,
        email: form.email,
        phone: form.phone,
        city: form.city,
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
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
          textContentType="emailAddress"
        />

        <TextInput
          style={styles.input}
          placeholder="Celular"
          placeholderTextColor="#b8d9bd"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(phone) => setForm({ ...form, phone })}
          textContentType="telephoneNumber"
        />

        <TextInput
          style={styles.input}
          placeholder="Cidade"
          placeholderTextColor="#b8d9bd"
          value={form.city}
          onChangeText={(city) => setForm({ ...form, city })}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#b8d9bd"
          secureTextEntry
          value={form.password}
          onChangeText={(password) => setForm({ ...form, password })}
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
