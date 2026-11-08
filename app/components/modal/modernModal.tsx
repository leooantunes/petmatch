import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, Text, View } from "react-native";
import { designTokens } from "../../constants/designTokens";
import { useTheme, useThemedStyles } from "../../hooks/useTheme";
import { AnimatedButton } from "../buttons/AnimatedButton";
import { createModalStyles } from "./_modal.styles";
import { MODAL_BUTTON } from "./modalCopy";
import { Icon } from "../icon/Icon";

type ModalVariant = "success" | "error" | "info" | "warning";

type ModernModalProps = Readonly<{
  visible: boolean;
  title: string;
  message: string;
  variant?: ModalVariant;
  confirmText?: string;
  cancelText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  showCancelButton?: boolean;
}>;

const iconMap: Record<
  ModalVariant,
  { name: keyof typeof AntDesign.glyphMap; color?: string }
> = {
  success: { name: "check-circle", color: "#22C55E" },
  error: { name: "close-circle", color: "#EF4444" },
  info: { name: "info-circle" }, // uses theme primary
  warning: { name: "warning", color: "#F59E0B" },
};

export default function ModernModal({
  visible,
  title,
  message,
  variant = "info",
  confirmText = MODAL_BUTTON.ok,
  cancelText = MODAL_BUTTON.cancel,
  onClose,
  onConfirm,
  showCancelButton = false,
}: ModernModalProps) {
  const { colors } = useTheme();
  const styles = useThemedStyles(createModalStyles);
  const progress = useRef(new Animated.Value(0)).current;
  const icon = iconMap[variant];

  useEffect(() => {
    if (!visible) {
      progress.setValue(0);
      return;
    }
    const animation = Animated.spring(progress, {
      toValue: 1,
      friction: 8,
      tension: 70,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [visible, progress]);

  const iconContainerStyle = {
    success: styles.successIcon,
    error: styles.errorIcon,
    info: styles.infoIcon,
    warning: styles.warningIcon,
  }[variant];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Fechar"
      />
      <View style={styles.center} pointerEvents="box-none">
        <Animated.View
          accessibilityViewIsModal
          accessibilityRole="alert"
          style={[
            styles.card,
            {
              opacity: progress,
              transform: [
                {
                  translateY: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [40, 0],
                  }),
                },
                {
                  scale: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.92, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={[styles.iconContainer, iconContainerStyle]}>
            <Icon family="antdesign"
              name={icon.name}
              size={24}
              color={icon.color ?? colors.primary}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            {showCancelButton ? (
              <View style={styles.actionItem}>
                <AnimatedButton
                  title={cancelText}
                  variant="secondary"
                  size="md"
                  onPress={onClose}
                  scaleDuration={designTokens.animation.fast}
                />
              </View>
            ) : null}
            <View style={styles.actionItem}>
              <AnimatedButton
                title={confirmText}
                variant={variant === "warning" && showCancelButton ? "danger" : "primary"}
                size="md"
                onPress={() => {
                  onConfirm?.();
                  onClose?.();
                }}
              />
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
