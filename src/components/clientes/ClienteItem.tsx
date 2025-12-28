import React from "react";
import { Cliente } from "../../data/mockApi";
import { List, Surface } from "react-native-paper";
import { StyleSheet } from "react-native";

type Props = {
  cliente: Cliente;
};

export default function ClienteItem({ cliente }: Props) {
  return (
    <Surface style={styles.container} elevation={1}>
    <List.Item
      // Texto principal (nombre del cliente)
      title={cliente.nombre}

      // Texto secundario (email o teléfono)
      description={(cliente.email ?? "Sin email") + " - " + (cliente.telefono ?? "Sin teléfono")}

      descriptionNumberOfLines={1}
      
      // Icono a la izquierda
      left={(props) => (
        <List.Icon
          {...props}
          icon="domain" // accont-group seria otra opción
        />
      )}

      // Acción al pulsar la fila
      onPress={() => {
        console.log("Cliente pulsado:", cliente.id);
      }}
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
});
