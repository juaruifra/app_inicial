import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { lightTheme, darkTheme } from "../src/theme/index";

import { AuthProvider } from "../src/context/AuthContext";
import { usePreferencesStore } from "../src/store/preferencesStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  // Obtenemos estado y acciones del store de preferencias
  const themeMode = usePreferencesStore((state) => state.theme);
  const isReady = usePreferencesStore((state) => state.isReady);
  const loadPreferences = usePreferencesStore(
    (state) => state.loadPreferences
  );

  // Crear una instancia de QueryClient
  const queryClient = new QueryClient();

  // Al arrancar la app cargamos las preferencias guardadas
  useEffect(() => {
    loadPreferences();
  }, []);

  // Mientras no estén listas, no renderizamos la app
  if (!isReady) {
    return null;
  }

  // Elegimos el tema personalizado según las preferencias
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    //Envolver toda la app con QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
