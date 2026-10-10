import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Text, View } from "react-native";
import { COLORS } from "../../styles/colors";
import { styles } from "./emptyList.styles";

type EmptyListProps = {
  icon: ComponentProps<typeof FontAwesome>["name"];
  message?: string;
};

export function EmptyList({
  icon,
  message = "Nenhuma opcao disponivel.",
}: Readonly<EmptyListProps>) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesome name={icon} size={40} color={COLORS.primary} />
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
