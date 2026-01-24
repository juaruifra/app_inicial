import React from "react";
import { View, StyleSheet } from "react-native";
import AppHeader from "../layout/AppHeader";
import { Text } from "react-native-paper";

export default function PreferenciasScreen() {

    // Obtenemos el usuario desde el contexto
    //const { user} = useAuth();
    return (
      <View style={styles.container}>
        {/* Barra superior reutilizable */}
        <AppHeader />

        {/* Contenido principal del home */}
        <View style={styles.content}>
          <Text variant="titleMedium">
            Bienvenido a la pagina de preferencias
            {/* Bienvenido a la aplicación <Text style={{fontWeight: "bold"}}>{user.name || ""}</Text> */}
          </Text>

          <Text variant="bodyMedium" style={styles.subtitle}>
            Desde aquí podrás gestionar tus preferencias generales
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
