import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, List, Surface, Text } from "react-native-paper";
import { PedidoConDetalle } from "../../data/mockApi";
import { formatDate } from "../../utils/date";
import { getEstadoPedidoUI } from "../../utils/pedidos";
import { formatNumber } from "../../utils/number";


type Props = {
  pedido: PedidoConDetalle;
  onPress?: () => void;
};

export default function PedidoItem({ pedido, onPress }: Props) {

  const estadoUI = getEstadoPedidoUI(pedido.estado);

  return (
    <Surface style={styles.container} elevation={1}>
      <List.Item
        title={pedido.codigo}
        description={`${formatDate(pedido.fechaInicio)} - ${formatDate(pedido.fechaFin)}`}
        left={(props) => <List.Icon {...props} icon="clipboard-text-outline" />}
        right={() => (
            <View style={styles.right}>
            <Chip
                compact
                style={[styles.estadoChip, { borderColor: estadoUI.color }]}
                textStyle={{ color: estadoUI.color, fontWeight: "700" }}
            >
                {estadoUI.label}
            </Chip>
            <Text style={styles.amount}>{formatNumber(pedido.totalImporte)} €</Text>
            </View>
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
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 8,
  },
  estadoChip: {
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  amount: {
    fontWeight: "600",
  },
});

