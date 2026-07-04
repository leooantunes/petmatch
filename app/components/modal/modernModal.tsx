import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { styles } from "./_modal.styles";
import { MODAL_BUTTON } from "./modalCopy";

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
  { name: keyof typeof AntDesign.glyphMap; color: string }
> = {
  success: { name: "checkcircle", color: "#22C55E" },
  error: { name: "closecircle", color: "#EF4444" },
  info: { name: "infocircle", color: COLORS.primary },
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
  const icon = iconMap[variant];
  let iconContainerStyle = styles.infoIcon;

  if (variant === "success") {
    iconContainerStyle = styles.successIcon;
  } else if (variant === "error") {
    iconContainerStyle = styles.errorIcon;
  } else if (variant === "warning") {
    iconContainerStyle = styles.warningIcon;
  }

  const containerStyle = [styles.iconContainer, iconContainerStyle];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.card}>
          <View style={containerStyle}>
            <AntDesign name={icon.name} size={24} color={icon.color} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            {showCancelButton ? (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.cancelText}>{cancelText}</Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                onConfirm?.();
                onClose?.();
              }}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
