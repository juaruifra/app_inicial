import { router } from "expo-router";
import { useEffect } from "react";
import { View,Text } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function InventarioTab() {
  // Esta pantalla es solo un puente para que exista la pestaña
  // Redirigimos a la ruta protegida real de admin
  // useEffect(() => {
  //   router.replace("/admin/inventario");
  // }, []);

  // return (
  //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //     <ActivityIndicator />
  //   </View>
  // );

  const { user } = useAuth();

  useEffect(() => {
    // Si no es administrador, lo sacamos de esta pantalla
    if (user?.roleId !== 2) {
      router.replace("/home");
    }
  }, [user]);

  // Mientras redirige, no mostramos nada
  if (user?.roleId !== 2) {
    return null;
  }

  return (
    <View>
      <Text>Inventario</Text>
    </View>
  );

}
