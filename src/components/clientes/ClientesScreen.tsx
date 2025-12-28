import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AppHeader from "../layout/AppHeader";
import { Text } from "react-native-paper";
import { Cliente } from "../../data/mockApi";

export default function ClientesScreen() {

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <View style={styles.container}>
        {/* Barra superior reutilizable */}
        <AppHeader title="Clientes" />

        {/* Contenido principal del home */}
        <View style={styles.content}>
            <Text variant="titleMedium">
            Bienvenido a la aplicación
            </Text>

            <Text variant="bodyMedium" style={styles.subtitle}>
            Desde aquí podrás gestionar tu trabajo diario
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
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
});