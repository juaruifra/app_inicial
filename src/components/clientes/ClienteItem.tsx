import React, { useRef } from "react";
import { Cliente } from "../../data/mockApi";
import { List, Surface, IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";

type Props = {
  cliente: Cliente;
  onPress?: () => void;
  onDelete?: () => void;
};

export default function ClienteItem({ cliente, onPress, onDelete }: Props) {

  // Flag para saber si el click viene del icono de borrar
  const isDeletingRef = useRef(false);

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
        // onPress={() => {
        //     console.log("Cliente pulsado:", cliente.id);
        // }}
        
        // Acción al pulsar la fila
        //onPress={onPress}

        onPress={() => {
          // Si el click viene del icono de borrar, no navegamos
          if (isDeletingRef.current) {
            isDeletingRef.current = false; // reseteamos la bandera
            return;
          }

          // Click normal → navegación normal
          onPress?.();
        }}

        right={() => (
          <IconButton
            icon="trash-can-outline"
            onPress={() => {

              // Marcamos que este click es de borrado
              isDeletingRef.current = true;

              // Avisamos al padre 
              onDelete?.();

            }}
          />
        )}
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
