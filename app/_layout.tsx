import React, { useEffect } from "react";
import { Slot } from "expo-router";
import {
  PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
} from "react-native-paper";

import { AuthProvider } from "../src/context/AuthContext";
import { usePreferencesStore } from "../src/store/preferencesStore";

export default function RootLayout() {
  // Obtenemos estado y acciones del store de preferencias
  const themeMode = usePreferencesStore((state) => state.theme);
  const isReady = usePreferencesStore((state) => state.isReady);
  const loadPreferences = usePreferencesStore(
    (state) => state.loadPreferences
  );

  // Al arrancar la app cargamos las preferencias guardadas
  useEffect(() => {
    loadPreferences();
  }, []);

  // Mientras no estén listas, no renderizamos la app
  if (!isReady) {
    return null;
  }

  // Elegimos el tema de Paper según las preferencias
  const theme =
    themeMode === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </PaperProvider>
  );
}
