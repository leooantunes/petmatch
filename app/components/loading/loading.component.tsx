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
import { useThemedStyles } from "../../hooks/useTheme";
import { createLoadingStyles } from "./loading.styles";
import { Icon } from "../icon/Icon";

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
  const styles = useThemedStyles(createLoadingStyles);
  const rotation = useRef(new Animated.Value(0)).current;
  const cardIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const spinLoop = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      );
      const entrance = Animated.spring(cardIn, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      });
      spinLoop.start();
      entrance.start();
      return () => {
        spinLoop.stop();
        entrance.stop();
      };
    }

    rotation.setValue(0);
    cardIn.setValue(0);
    return undefined;
  }, [visible, rotation, cardIn]);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Modal visible={visible} transparent statusBarTranslucent animationType="fade">
      <View style={styles.overlay} pointerEvents="auto">
        <Animated.View
          style={[
            styles.loaderCard,
            {
              opacity: cardIn,
              transform: [
                {
                  scale: cardIn.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
          ]}
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel="Carregando"
        >
          <Animated.View
            style={[styles.pawWrapper, { transform: [{ rotate: spin }] }]}
          >
            <Icon name="paw" size={48} color="primary" />
          </Animated.View>
          <Text style={styles.loaderText}>Carregando...</Text>
        </Animated.View>
      </View>
    </Modal>
  );
}
