import React from "react";
import { StyleSheet } from "react-native";
import { List, Surface, Text } from "react-native-paper";
import { PedidoConDetalle } from "../../data/mockApi";
import { formatDate } from "../../utils/date";

type Props = {
  pedido: PedidoConDetalle;
  onPress?: () => void;
};

export default function PedidoItem({ pedido, onPress }: Props) {
  return (
    <Surface style={styles.container} elevation={1}>
      <List.Item
        title={`${pedido.codigo} - ${pedido.estado}`}
        description={`${formatDate(pedido.fechaInicio)} - ${formatDate(
          pedido.fechaFin
        )}`}
        left={(props) => (
          <List.Icon {...props} icon="clipboard-text-outline" />
        )}
        right={() => (
          <Text style={styles.amount}>
            {pedido.totalImporte} €
          </Text>
        )}
        onPress={onPress}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  amount: {
    alignSelf: "center",
    fontWeight: "600",
    marginRight: 8,
  },
});
