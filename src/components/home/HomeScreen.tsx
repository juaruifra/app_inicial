import React from "react";
import { View, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Text,
  Card,
  Avatar,
  Chip,
  List,
  useTheme,
} from "react-native-paper";
import { router } from "expo-router";
import AppHeader from "../layout/AppHeader";
import { useUserStore } from "../../store/userStore";

export default function HomeScreen() {
  const theme = useTheme();
  const user = useUserStore((state) => state.user);

  // Mientras el usuario se restaura desde storage
  if (!user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  const isAdmin = user.role === "ADMIN";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      {/* Barra superior */}
      <AppHeader />

      <View style={styles.content}>
        {/* Card de bienvenida */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Avatar.Icon
              size={64}
              icon="account"
              style={{ backgroundColor: theme.colors.primary }}
            />

            <View style={styles.userInfo}>
              <Text variant="titleMedium">
                Bienvenido,
                <Text style={{ fontWeight: "bold" }}> {user.name}</Text>
              </Text>

              <Chip
                style={[
                  styles.roleChip,
                  {
                    backgroundColor: isAdmin
                      ? theme.colors.errorContainer
                      : theme.colors.secondaryContainer,
                  },
                ]}
                textStyle={{
                  color: isAdmin
                    ? theme.colors.error
                    : theme.colors.secondary,
                  fontWeight: "600",
                }}
                icon={isAdmin ? "shield-account" : "account-check"}
              >
                {isAdmin ? "Administrador" : "Usuario"}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Texto contextual */}
        <Text
          variant="bodyMedium"
          style={[
            styles.subtitle,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          Desde aquí puedes acceder a los distintos módulos de la aplicación y
          gestionar tu trabajo diario.
        </Text>

        {/* Acciones rápidas */}
        <Card style={styles.actionsCard}>
          <List.Item
            title="Perfil"
            description="Ver y editar tus datos"
            left={(props) => (
              <List.Icon {...props} icon="account-circle-outline" />
            )}
            onPress={() => router.push("/perfil")}
          />

          <List.Item
            title="Preferencias"
            description="Tema e idioma de la aplicación"
            left={(props) => (
              <List.Icon {...props} icon="cog-outline" />
            )}
            onPress={() => router.push("/preferencias")}
          />

          
          <List.Item
            title="Clientes"
            description="Gestión de clientes"
            left={(props) => (
              <List.Icon {...props} icon="account-group-outline" />
            )}
            onPress={() => router.push("/clientes")}
          />
          
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  userInfo: {
    flex: 1,
    gap: 6,
  },
  roleChip: {
    alignSelf: "flex-start",
  },
  subtitle: {
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionsCard: {
    borderRadius: 16,
  },
});
