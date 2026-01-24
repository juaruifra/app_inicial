import { Tabs, Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserStore } from "../../src/store/userStore";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // Recuperamos el usuario del store de zustand
  const user = useUserStore((state) => state.user);

  // Mientras cargamos el usuario desde storage
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  // Si no hay usuario, vamos al login
  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  // Si hay sesión pero el usuario aún no está cargado
  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  //Si el usuario es ADMIN, no puede estar en tabs-user
  if (user.roleId === 2) {
    return <Redirect href="/(tabs-admin)/home" />;
  }

  // Tabs SOLO para usuario normal
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6750A4",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="pedidos"
        options={{
          title: "Pedidos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="clientes"
        options={{
          title: "Clientes",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="clientes/[id]"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="preferencias"
        options={{
          href: null,
        }}
      />

    </Tabs>
  );
}
