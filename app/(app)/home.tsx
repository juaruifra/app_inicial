// app/home.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";

// Importamos el hook de auth para acceder al usuario y al logout
import { useAuth } from "../../src/context/AuthContext";

export default function HomeScreen() {
  // Obtenemos el usuario actual y la función logout
  const { user, logout } = useAuth();

  // Función que se ejecuta al pulsar "Cerrar sesión"
  const handleLogout = async () => {
    await logout();
    // NO navegamos aquí manualmente.
    // Más adelante haremos que la app redirija sola al login.
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Pantalla principal
      </Text>

      {/* Mostramos información básica del usuario */}
      <Text>
        Nombre: {user?.name}
      </Text>
      <Text>
        Email: {user?.email}
      </Text>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.button}
      >
        Cerrar sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});
