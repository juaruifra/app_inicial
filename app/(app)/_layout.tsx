// app/(app)/_layout.tsx
import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { View, ActivityIndicator } from "react-native";

// Importamos el hook de auth para saber si hay usuario
import { useAuth } from "../../src/context/AuthContext";

export default function AppLayout() {
  // Obtenemos el usuario y el estado de carga
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Mientras estamos comprobando el storage, no hacemos nada
    if (isLoading) return;

    // Si NO hay usuario, lo mandamos al login
    if (!user) {
      router.replace("/login");
    }
  }, [user, isLoading]);

  // Mientras se decide si hay usuario o no, mostramos un loader
  if (isLoading || !user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Si hay usuario, renderizamos las pantallas del grupo (app)
  return (
    <Stack
      screenOptions={{
        headerShown: false, // puedes cambiarlo luego
      }}
    />
  );
}
