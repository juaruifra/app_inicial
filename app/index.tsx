// app/index.tsx
import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { router } from "expo-router";

import { useAuth } from "../src/context/AuthContext";

export default function IndexScreen() {
  // Obtenemos el usuario y el estado de carga del contexto
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Mientras estamos comprobando el storage, no hacemos nada
    if (isLoading) return;

    // Si hay usuario:  vamos a la pantalla principal
    if (user) {
      router.replace("/home");
    } else {
      // Si NO hay usuario: vamos al login
      router.replace("/login");
    }
  }, [user, isLoading]);

  // Mientras decidimos a dónde ir, mostramos un loader simple
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
