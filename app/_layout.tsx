import React from "react";
import { Slot } from "expo-router";
import {PaperProvider, MD3LightTheme, MD3DarkTheme} from "react-native-paper";
import { useColorScheme } from "react-native";
import { AuthProvider } from "../src/context/AuthContext";

export default function RootLayout() {
  // Detectamos si el sistema está en modo claro u oscuro
  const colorScheme = useColorScheme();

  // Elegimos el tema de Paper en función del modo del sistema
  const theme =
    colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    // Proveedor de React Native Paper: tema global (colores, tipografía, etc.)
    <PaperProvider theme={theme}>
      {/* 
        AuthProvider envuelve a toda la app.
        Aquí dentro, cualquier pantalla puede usar useAuth().
      */}
      <AuthProvider>
        {/* 
          Slot es el "hueco" donde expo-router renderiza
          las pantallas según la ruta actual.
        */}
        <Slot />
      </AuthProvider>
    </PaperProvider>
  );
}
