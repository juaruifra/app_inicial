import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function Preferencias() {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Preferencias</Text>
      <Text style={styles.subtitle}>
        Aquí irán las opciones de la aplicación
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.7,
  },
});
