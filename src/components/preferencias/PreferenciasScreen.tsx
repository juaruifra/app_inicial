import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Card,
  Text,
  Switch,
  Divider,
  Button,
  Menu,
  useTheme,
} from "react-native-paper";

import AppHeader from "../layout/AppHeader";
import { usePreferencesStore } from "../../store/preferencesStore";

export default function PreferenciasScreen() {
  const theme = useTheme();

  // Estado global de preferencias (Zustand)
  const {
    theme: currentTheme,
    language,
    setTheme,
    setLanguage,
  } = usePreferencesStore();

  // Controla si el menú de idioma está abierto
  const [languageMenuVisible, setLanguageMenuVisible] = useState(false);

  // ¿Está en modo oscuro?
  const isDark = currentTheme === "dark";

  // Texto legible del idioma actual
  const languageLabel = language === "es" ? "Español" : "Inglés";

  return (
    <View style={{ flex: 1 }}>
      {/* Barra superior reutilizable */}
      <AppHeader />

      {/* Contenido de la pantalla */}
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            {/* Título principal */}
            <Text variant="titleMedium" style={styles.title}>
              Preferencias
            </Text>

            {/* ===== BLOQUE: TEMA ===== */}
            <Text variant="labelLarge" style={styles.sectionTitle}>
              Tema de la aplicación
            </Text>

            <View style={styles.row}>
              <View style={styles.textBlock}>
                <Text>Modo oscuro</Text>
                <Text style={styles.helper}>
                  Activa o desactiva el tema oscuro de la app
                </Text>
              </View>

              <Switch
                value={isDark}
                onValueChange={(value) =>
                  setTheme(value ? "dark" : "light")
                }
                color={theme.colors.primary}
              />
            </View>

            <Divider style={styles.divider} />

            {/* ===== BLOQUE: IDIOMA ===== */}
            <Text variant="labelLarge" style={styles.sectionTitle}>
              Idioma
            </Text>

            <Menu
              visible={languageMenuVisible}
              onDismiss={() => setLanguageMenuVisible(false)}
              anchor={
                <Button
                  mode="outlined"
                  onPress={() => setLanguageMenuVisible(true)}
                  // Que el texto y el icono queden separados
                  contentStyle={styles.languageButtonContent}
                  icon="chevron-down"
                >
                  {languageLabel}
                </Button>
              }
            >
              <Menu.Item
                onPress={() => {
                  setLanguage("es");
                  setLanguageMenuVisible(false);
                }}
                title="Español"
              />
              <Menu.Item
                onPress={() => {
                  setLanguage("en");
                  setLanguageMenuVisible(false);
                }}
                title="Inglés"
              />
            </Menu>

            <Text style={styles.helper}>
              El idioma se usará para los textos de la aplicación
              más adelante.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  card: {
    borderRadius: 16,
  },
  title: {
    marginBottom: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textBlock: {
    flex: 1,
    paddingRight: 16,
  },
  helper: {
    marginTop: 4,
    opacity: 0.6,
    fontSize: 12,
  },
  divider: {
    marginVertical: 16,
  },
  languageButtonContent: {
    flexDirection: "row-reverse", // icono a la derecha
    justifyContent: "space-between",
  },
});
