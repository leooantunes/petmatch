import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { FirebaseError } from "@firebase/util";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLoading } from "../../components/loading/loading.component";
import { COLORS } from "../../styles/colors";
import { UserCredentials } from "../../types/user";
import { styles } from "./_login.styles";

export default function LoginScreen() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const { showLoading, hideLoading } = useLoading();

  const onLogin = async () => {
    showLoading();
    try {
      await auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
      router.push("/screens/petList/petList.screen");
    } catch (e: any) {
      const err = e as FirebaseError;
      Alert.alert("Erro ao fazer login", err.message);
    } finally {
      hideLoading();
    }
  };

  const onCreateAccount = () => {
    router.push("/screens/register/register.screen");
  };

  const onSocialLogin = (provider: string) => {
    Alert.alert("Login social", `Fazer login com ${provider}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoWrapper}>
          <View style={styles.illustrationWrapper}>
            <MaterialCommunityIcons
              name="dog"
              size={58}
              color={COLORS.primaryMedium}
              style={styles.dogIcon}
            />
            <MaterialCommunityIcons
              name="cat"
              size={50}
              color={COLORS.primaryDark}
              style={styles.catIcon}
            />
          </View>
        </View>

        <Text style={styles.title}>PetMatch</Text>
        <Text style={styles.subtitle}>Adoção responsável começa aqui</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#b8d9bd"
          keyboardType="email-address"
          autoCapitalize="none"
          value={credentials.email}
          onChangeText={(email) => setCredentials({ ...credentials, email })}
          textContentType="emailAddress"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#b8d9bd"
          secureTextEntry
          value={credentials.password}
          onChangeText={(password) =>
            setCredentials({ ...credentials, password })
          }
          textContentType="password"
        />

        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.bottomInfo}>
          <Text style={styles.tip}>Ainda não tem conta?</Text>
          <TouchableOpacity onPress={onCreateAccount}>
            <Text style={styles.linkText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OU</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.containerSocial}>
          <TouchableOpacity
            style={[styles.socialButton, styles.socialGoogle]}
            onPress={() => onSocialLogin("Google")}
          >
            <AntDesign style={styles.socialButtonText} name="google" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, styles.socialFacebook]}
            onPress={() => onSocialLogin("Facebook")}
          >
            <FontAwesome style={styles.socialButtonText} name="facebook" />
          </TouchableOpacity>

          {Platform.OS === "ios" && (
            <TouchableOpacity
              style={[styles.socialButton, styles.socialApple]}
              onPress={() => onSocialLogin("Apple")}
            >
              <AntDesign style={styles.socialButtonText} name="apple" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
