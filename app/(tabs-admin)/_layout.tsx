import { Tabs, Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../../src/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserStore } from "../../src/store/userStore";
import { useTheme } from "react-native-paper";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const user = useUserStore((state) => state.user);
  const theme = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!isAuthenticated) return <Redirect href="/login" />;
  if (!user) return null;
  if (user.roleId !== 2) return <Redirect href="/(tabs-user)/home" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        // Colores de icono/texto activos
        tabBarActiveTintColor: theme.colors.primary,

        // Ajuste solo para modo oscuro: inactivo más apagado
        tabBarInactiveTintColor: theme.dark
          ? theme.colors.outline // más gris en dark
          : theme.colors.onSurfaceVariant, // lo que ya usabas en light

        // Fondo de la tab bar
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
        },
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
        name="inventario"
        options={{
          title: "Inventario",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="warehouse" color={color} size={size} />
          ),
        }}
      />

      {/* Rutas ocultas de tabs */}
      <Tabs.Screen name="clientes/[id]" options={{ href: null }} />
      <Tabs.Screen name="preferencias" options={{ href: null }} />
      <Tabs.Screen name="perfil" options={{ href: null }} />
      <Tabs.Screen name="changePassword" options={{ href: null }} />
    </Tabs>
  );
}
