import { FontAwesome } from "@expo/vector-icons";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Modal, Text, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { loadingStyles as styles } from "./loading.styles";

type LoadingContextData = {
  showLoading: () => void;
  hideLoading: () => void;
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextData | null>(null);

export function LoadingProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);

  const contextValue = useMemo(
    () => ({ showLoading, hideLoading, isLoading }),
    [showLoading, hideLoading, isLoading],
  );

  return (
    <LoadingContext.Provider value={contextValue}>
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

function Loading({ visible }: Readonly<{ visible: boolean }>) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const animation = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      );
      animation.start();
      return () => animation.stop();
    }

    rotation.setValue(0);
    return undefined;
  }, [visible, rotation]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal visible={visible} transparent statusBarTranslucent>
      <View style={styles.overlay} pointerEvents="auto">
        <View style={styles.loaderCard}>
          <Animated.View
            style={[styles.pawWrapper, { transform: [{ rotate: spin }] }]}
          >
            <FontAwesome name="paw" size={48} color={COLORS.primary} />
          </Animated.View>
          <Text style={styles.loaderText}>Carregando...</Text>
        </View>
      </View>
    </Modal>
  );
}
