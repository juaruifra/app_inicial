import React from "react";
import { View, StyleSheet } from "react-native";
import AppHeader from "../layout/AppHeader";
import { Text, useTheme } from "react-native-paper";

export default function PedidosScreen() {

  const theme = useTheme();

    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Barra superior reutilizable */}
        <AppHeader />

        {/* Contenido principal de la pagina de inventario */}
        <View style={styles.content}>
          <Text variant="titleMedium">
            Desde aquí se realizará la gestión de inventario
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