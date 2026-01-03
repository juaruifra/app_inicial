import React from "react";
import { View, StyleSheet } from "react-native";
import AppHeader from "../layout/AppHeader";
import { Text } from "react-native-paper";

export default function PedidosScreen() {

    return (
      <View style={styles.container}>
        {/* Barra superior reutilizable */}
        <AppHeader />

        {/* Contenido principal de la pagina de pedidos */}
        <View style={styles.content}>
          <Text variant="titleMedium">
            Desde aquí se realizará la gestión de pedidos
          </Text>

        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});


