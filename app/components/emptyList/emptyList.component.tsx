import { FontAwesome } from "@expo/vector-icons";
import React, { ComponentProps, useEffect, useRef } from "react";
import { Animated, Image, Text, View } from "react-native";
import { useThemedStyles } from "../../hooks/useTheme";
import { Icon } from "../icon/Icon";
import { createEmptyListStyles } from "./emptyList.styles";

const brandIllustration = require("../../../assets/images/gato-cachorro-pixel-v3.png");

type EmptyListProps = {
  icon: ComponentProps<typeof FontAwesome>["name"];
  message?: string;
  /** Secondary line under the message, e.g. a hint about what to do next. */
  hint?: string;
  /** Show the brand pixel-art illustration (with the icon as a badge) instead of the plain icon. */
  illustration?: boolean;
};

export function EmptyList({
  icon,
  message = "Nenhuma opcao disponivel.",
  hint,
  illustration = false,
}: Readonly<EmptyListProps>) {
  const styles = useThemedStyles(createEmptyListStyles);
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!illustration) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [illustration, float]);

  const label = hint ? `${message} ${hint}` : message;

  return (
    <View style={styles.container} accessible accessibilityLabel={label}>
      {illustration ? (
        <View style={styles.illustrationWrapper}>
          <View style={styles.illustrationHalo} />
          <Animated.View
            style={{
              transform: [
                {
                  translateY: float.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -6],
                  }),
                },
              ],
            }}
          >
            <Image source={brandIllustration} style={styles.illustration} />
          </Animated.View>
          <View style={styles.illustrationBadge}>
            <Icon name={icon} size="sm" color="onPrimary" />
          </View>
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <Icon name={icon} size="xl" color="primary" />
        </View>
      )}
      <Text style={styles.message}>{message}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}
