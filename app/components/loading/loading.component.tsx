import React, { createContext, ReactNode, useContext, useState } from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { loadingStyles as styles } from "./loading.styles";

type LoadingContextData = {
  showLoading: () => void;
  hideLoading: () => void;
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextData | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ showLoading, hideLoading, isLoading }}>
      {children}
      <Loading visible={isLoading} />
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }

  return context;
}

function Loading({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <View style={styles.overlay} pointerEvents="auto">
        <View style={styles.loaderCard}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loaderText}>Carregando...</Text>
        </View>
      </View>
    </Modal>
  );
}
